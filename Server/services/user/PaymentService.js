require('dotenv').config()
const Razorpay = require('razorpay')
const { USER_CART } = require('../../models/UserCartModel')
const { ORDER_DB } = require('../../models/UserOrderModel')
const { USER_DATA } = require('../../models/UserAuthModel')
const { ISSUES_DB } = require('../../models/IssueModel')
const { sendOrderMail, sendIssueReported } = require('../../services/mailer')

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

exports.createOrder = async ({ totalprice, CARTID }) => {
    const options = {
        amount: totalprice * 100,
        currency: 'INR',
        receipt: 'receipt 1'
    }
    const usercart = await USER_CART.findOne({ _id: CARTID })
    const productss = usercart.Products

    const response = await razorpay.orders.create(options)

    const ITEMS1 = productss.map(item => ({
        product_id: item.product_id,
        product_name: item.product_name,
        Quantity: item.Quantity,
        Size: item.Size,
        Color: item.Color,
        Amount: item.payable_amount,
        Product_url: item.product_img_url
    }))
    const TRANSACTION1 = {
        orderId: response.id,
        amount: response.amount / 100,
        currency: response.currency,
    }
    await ORDER_DB.updateOne({ CART_ID: CARTID },
        {
            $set: {
                ITEMS: ITEMS1,
                TRANSACTION: TRANSACTION1
            }
        }
    )
    return { orderID: response.id, amount: response.amount, currency: response.currency }
}

exports.paymentOrder = async ({ order_creation_id, paymentid, orderid, sign, cartID }) => {
    const payment = await razorpay.payments.fetch(paymentid)
    if (!payment) return { message: 'error at razorpay loading', status: 500 }

    await ORDER_DB.findOneAndUpdate(
        { 'TRANSACTION.orderId': order_creation_id },
        {
            'TRANSACTION.paymentId': paymentid,
            'TRANSACTION.signature': sign,
            'TRANSACTION.status': 'Paid',
            orderStatus: 'Processing',
            updatedAt: new Date()
        },
        { new: true }
    );

    await USER_CART.deleteOne({ _id: cartID })
    sendOrderMail()

    return { method: payment.method, success: true }
}

exports.getOrders = async (userId) => {
    const findUser = await USER_DATA.findOne({ _id: userId })
    if (!findUser) return { status: 404 }

    const findOrders = await ORDER_DB.find({ USER_ID: userId }, '-TRANSACTION.paymentId -TRANSACTION.orderId -TRANSACTION.signature')

    const products = findOrders.map(order => order.ITEMS)
    return { status: 200, Orders: findOrders, Products: products }
}

exports.requestIssues = async ({ userId, subject, main, orderid }) => {
    const findUser = await USER_DATA.findOne({ _id: userId })
    if (!findUser) return { status: 404 }

    const createIssue = await ISSUES_DB({
        USER_ID: userId,
        ORDER_ID: orderid,
        Subject: subject,
        Main: main,
        Contact: findUser.email,
        Mobile: findUser.Mobile_No
    })

    await createIssue.save()

    sendIssueReported(subject, main, orderid)
    await ORDER_DB.updateOne({ USER_ORDER_ID: orderid }, {
        $set: {
            Issue_Reported: true
        }
    })

    return { status: 200, Message: 'Submitted' }
}
