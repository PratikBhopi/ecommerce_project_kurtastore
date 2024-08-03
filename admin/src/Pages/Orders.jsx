import React from 'react'
import PageLayout from '../components/PageLayout'
import { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field } from 'formik'


const Orders = () => {

    const [allOrders, setAllOrders] = useState([])

    const callr = (orders) => {
        orders.map(or => {
            console.log(or)
        })
    }
    const findOrders = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/getorders`, {
                method: 'GET',
                headers: {
                    token: sessionStorage.getItem('token')
                }
            })
            const data = await response.json()
            if (data.status == 200) {
                // console.log(typeof(data.Products))

                // console.log(data)
                setAllOrders(data.Products)
                callr(data.Products)
            }
        } catch (error) {

        }
    }
    const updateOrder= async(values,orderid)=>{

        try {
            const reponse = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/updateOrder`,{
                method:'POST',
                headers:{
                    'Content-type':'Application/json',
                    token:sessionStorage.getItem('token')
                },
                body: JSON.stringify({order_stat:values.status,orderid})
            }
            )

            const data = await response.json()
            
            if(data.status == 200){
                toast('Order Status : Updated!')
                findOrders()
            }else{
                toast('error occured')
            }
            
        } catch (error) {
                toast('Server Timed Out')
        }
    }

    useEffect(() => {
        findOrders()
    }, [])

    return (
        <>
            <PageLayout title={'All Oders'}>

                <div className='w-full'>
                    <ToastContainer />
                    <div className='h-10 w-full'></div>
                    <div className='w-full ss:pl-10 pl-5 s:pl-20 QuoteLines  '> My Orders</div>
                    <div className='pt-10 px-10 '>
                        {
                            allOrders.map(order => {
                                return <div className='w-full s:px-20 ss:px-10 px-4 s:py-10  py-4 my-3 bg-white border rounded-[20px] ' key={order.USER_ORDER_ID}>
                                    <div className='w-full flex justify-between items-center'>
                                        <div className='py-2 pl-3 font-[600]'>Total : ₹ {order.Total_Price + '/-'}</div>
                                        <div>
                                            <div>
                                                <Formik onSubmit={(values)=>updateOrder(values,order.USER_ORDER_ID)} initialValues={{ status: order.orderStatus }}>
                                                    <Form>
                                                        <div iv className='ss:py-2 py-1 rounded-full text-[14px] ss:text-[16px] font-[600] text-green-600 bg-stone-300  px-2 ss:px-4'>
                                                            <Field className='bg-transparent' as='select' name="status" id="status" >
                                                                <option value="Processing" label="Processing" />
                                                                <option value="Shipped" label="Shipped" />
                                                                <option value="Delivered" label="Delivered" />
                                                            </Field>
                                                        </div>
                                                        <div>
                                                        <button className='w-full bg-green-300 rounded-xl my-2' type='submit'>Submit</button>
                                                        </div>
                                                    </Form>
                                                </Formik>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='font-[600] w-full my-2 s:text-[16px] text-[12px]'>Order ID:  {order.USER_ORDER_ID}</div>
                                    <div className='text-[14px]  font-[600]'>Transaction Order ID :  {order.TRANSACTION.orderId}</div>
                                    <div className=' text-[14px] font-[600]'>Payment  ID :  {order.TRANSACTION.paymentId}</div>
                                    {
                                        order.ITEMS.map(item => {
                                            return <div key={item.product_id} className='w-full my-3 rounded-[12px] s:rounded-[20px] overflow-hidden  border shadow-sm flex'>
                                                <div>
                                                    <img className='w-[130px]' src={item.Product_url} alt="" />
                                                </div>
                                                <div className='pl-4 pt-3 text-[14px]'>
                                                    <div className='ss:text-[16px] text-[14px] font-[500] '>{item.product_name}</div>
                                                    <div className='ss:text-[16px] text-[14px] font-[500] '>Product ID: {item.product_id}</div>
                                                    <div >{item.Size}</div>
                                                    <div> Qty: {item.Quantity}</div>
                                                    <div>{'₹ ' + item.Amount + '/-'}</div>
                                                </div>
                                            </div>
                                        })

                                    }
                                    <div className='w-full '>
                                        <div className='px-3'>
                                            <h1 className='font-[600]'>Delivery Address:</h1>
                                            <p className='text-[14px] font-[400] '>{order.USER_DETAILS.address}, {order.USER_DETAILS.city}, {order.USER_DETAILS.state} - {order.USER_DETAILS.pincode}</p>
                                        </div>
                                    </div>
                                    {/* <div className='w-full flex justify-center my-3 items-center'>
                                        <div style={{ backgroundColor: order.orderStatus == 'Processing' ? 'green' : 'darkgreen' }} className={`ss:w-10 ss:h-10 w-7 h-7 rounded-full border border-green-600 flex justify-center items-center ${order.orderStatus == 'Processing' ? 'animate-pulse' : ''}`}>{order.orderStatus == 'Processing' ? <TfiPackage className='ss:scale-[1.2] scale-[1] text-white' /> : ''} </div>
                                        <div className='relative w-[70px] ss:w-[100px] h-1 bg-gradient-to-r  from-green-400 to-green-500'></div>
                                        <div style={{ backgroundColor: order.orderStatus == 'Shipped' ? 'green' : 'white' }} className={`ss:w-10 ss:h-10 w-7 h-7 rounded-full border border-green-600 flex justify-center items-center ${order.orderStatus == 'Shipped' ? 'animate-pulse' : ''}`}>{order.orderStatus == 'Shipped' ? <LiaShippingFastSolid className='ss:scale-[1.2]  scale-[1] text-white' /> : <LiaShippingFastSolid className='scale-[1] ss:scale-[1.2] ' />}</div>
                                        <div className='relative w-[70px] ss:w-[100px] h-1 bg-gradient-to-r from-green-300 to-green-500'></div>
                                        <div style={{ backgroundColor: order.orderStatus == 'Delivered' ? 'green' : 'white' }} className={`ss:w-10 ss:h-10 w-7 h-7 rounded-full border border-green-600 flex justify-center items-center ${order.orderStatus == 'Delivered' ? 'animate-pulse' : ''}`} >{order.orderStatus == 'Delivered' ? <MdOutlineDoneOutline className='ss:scale-[1.2] scale-[1] text-white' /> : <MdOutlineDoneOutline className='scale-[1] ss:scale-[1.2] ' />}</div>
                                    </div> */}
                                </div>
                            })
                        }
                    </div>
                </div>
            </PageLayout >


        </>
    )
}

export default Orders
