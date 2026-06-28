const { ORDER_DB } = require('../../models/UserOrderModel')
const { PRODUCTS_DB } = require('../../models/ProductModel')

exports.getusersorders = async () => {
    const allProducts = await ORDER_DB.find({})
    return { status: 200, Products: allProducts }
}

exports.updateOrder = async ({ order_stat, orderid }) => {
    await ORDER_DB.updateOne({ USER_ORDER_ID: orderid }, {
        $set: {
            orderStatus: order_stat
        }
    })
    return { status: 200, message: 'updated' }
}

exports.updateStocks = async ({ productid, outofstock }) => {
    await PRODUCTS_DB.updateOne({ PRODUCT_id: productid }, {
        $set: {
            outofstock: outofstock
        }
    })
    return { status: 200, message: 'updated' }
}
