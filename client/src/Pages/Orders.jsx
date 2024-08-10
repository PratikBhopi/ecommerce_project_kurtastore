import React, { useContext, useEffect, useState } from 'react'
import Header from '../Component/Header'
import { UserContextApi } from '../context/UserContext'
import { Link } from 'react-router-dom'
import { TfiPackage } from "react-icons/tfi";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineDoneOutline } from "react-icons/md";

import {Formik,Form,Field} from 'formik'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Orders = () => {

    const { isLoggedIn } = useContext(UserContextApi)
    const [allOrders, setAllOrders] = useState([])

    const findOrders = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getorders`, {
                method: 'GET',
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            const data = await response.json()

            if (data.status == 200) {
                setAllOrders(data.Orders)
            }
        } catch (error) {

        }
    }

    const sendRequest =async (values,orderid)=>{

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/request-us`,{
                method:'POST',
                headers:{
                    'Content-type':'Application/json',
                    token:localStorage.getItem('token')
                },
                body:   JSON.stringify({subject:values.subject,main:values.main,orderid})
            })
            const data = await response.json()
            if(data.status=200){
                toast('Your request has been reported.')
            }
        } catch (error) {
            toast('error occured')
            toast('please try later!')
        }
    }

    useEffect(() => {
        findOrders()
    }, [])


    return (
        <>
            <div className='w-screen bg-[#efefef] '>
                <ToastContainer newestOnTop={true} autoClose={1000}
          toastStyle={{ backgroundColor: "white", color: "black" }} pauseOnFocusLoss={true} pauseOnHover={false} hideProgressBar={true}  />
                <div className='w-full fixed z-[99]'><Header /></div>
                <div className='w-full bodytext '>
                    <div className='w-screen bg-red-400 h-[50px] ss:h-[60px] sl:h-[65px] f:h-[79px]'></div>
                    {
                        isLoggedIn
                            ?
                            <div>
                                <div className='h-10 w-full'></div>
                                <div className='w-full ss:pl-10 pl-5 s:pl-20 QuoteLines font-[600]  text-[20px] '> My Orders</div>
                                <div className='pt-10 px-5  s:px-[14vw]'>
                                    {
                                        allOrders.map(order => {
                                            return <div className='w-full s:px-20 ss:px-10 px-4 s:py-10  py-4 my-3 bg-white border rounded-[20px] ' key={order.USER_ORDER_ID}>
                                                <div className='font-[600] w-full my-2 s:text-[16px] text-[12px]'>Order ID:  {order.USER_ORDER_ID}</div>
                                                <div className='w-full ss:flex ss:justify-between ss:flex-wrap'>
                                                {
                                                    order.ITEMS.map(item => {
                                                        return <div key={item.product_id} className='ss:w-[48%] w-[100%] my-3  rounded-[12px] s:rounded-[20px] overflow-hidden  border shadow-sm flex'>
                                                            <div>
                                                                <img className='ss:w-[130px] w-[100px]' src={item.Product_url} alt="" />
                                                            </div>
                                                            <div className='pl-4 pt-3 text-[14px]'>
                                                                <div className='ss:text-[16px] text-[14px] font-[500] '>{item.product_name}</div>
                                                                <div >{item.Size}</div>
                                                                <div> Qty: {item.Quantity}</div>
                                                                <div>{'₹ ' + item.Amount + '/-'}</div>
                                                            </div>
                                                        </div>
                                                    })

                                                }
                                                </div>

                                                <div className='w-full '>
                                                    <div className='px-3'>
                                                        <h1 className='font-[600]'>Delivery Address:</h1>
                                                        <p className='text-[14px] font-[400] '>{order.USER_DETAILS.address}, {order.USER_DETAILS.city}, {order.USER_DETAILS.state} - {order.USER_DETAILS.pincode}</p>
                                                    </div>
                                                </div>
                                                <div className='w-full flex justify-between items-center'>
                                                    <div className='py-2 pl-3 font-[600]'>Total : ₹ {order.Total_Price + '/-'}</div>
                                                    <div>
                                                        <div className='ss:py-2 py-1 rounded-full text-[12px] ss:text-[15px] font-[600] text-green-600 bg-stone-300  px-2 ss:px-4'> {order.orderStatus}</div>
                                                    </div>
                                                </div>
                                                <div className='w-full flex justify-center my-3 items-center'>
                                                    <div style={{backgroundColor : order.orderStatus == 'Processing' ? 'green':'darkgreen'}} className={`ss:w-10 ss:h-10 w-7 h-7 rounded-full border border-green-600 flex justify-center items-center ${order.orderStatus == 'Processing' ? 'animate-pulse' :''}`}>{order.orderStatus == 'Processing' ? <TfiPackage  className='ss:scale-[1.2] scale-[1] text-white' /> :''} </div>
                                                    <div className='relative w-[70px] ss:w-[100px] h-[3px] bg-gradient-to-r  from-green-400 to-green-600'></div>
                                                    <div  style={{backgroundColor : order.orderStatus == 'Shipped'  ? 'green':order.orderStatus == 'Delivered' ? 'darkgreen':'white' }} className={`ss:w-10 ss:h-10 w-7 h-7 rounded-full border border-green-600 flex justify-center items-center ${order.orderStatus == 'Shipped' ? 'animate-pulse' :''}`}>{order.orderStatus == 'Shipped' ? <LiaShippingFastSolid  className='ss:scale-[1.2]  scale-[1] text-white' /> :<LiaShippingFastSolid   className='scale-[1] ss:scale-[1.2] ' />}</div>
                                                    <div className='relative w-[70px] ss:w-[100px] h-1 bg-gradient-to-r from-green-300 to-green-500'></div>
                                                    <div  style={{backgroundColor : order.orderStatus == 'Delivered' ? 'green':'white'}} className={`ss:w-10 ss:h-10 w-7 h-7 rounded-full border border-green-600 flex justify-center items-center ${order.orderStatus == 'Delivered' ? 'animate-pulse' :''}`} >{order.orderStatus == 'Delivered' ? <MdOutlineDoneOutline  className='ss:scale-[1.2] scale-[1] text-white' /> :<MdOutlineDoneOutline   className='scale-[1] ss:scale-[1.2] ' />}</div>
                                                </div>

                                                {
                                                    order.orderStatus  == 'Delivered'

                                                    ?
                                                    order.Issue_Reported
                                                    ?
                                                    <div className='mt-5 w-full px-3 py-2 rounded-lg text-[10px] ss:text-[13px] font-[600] bg-[#efefef]'>
                                                            <h1>Your Issue has been reported. Our Team will contact you soon. </h1>
                                                            <h1>Keep Patience.</h1>
                                                    </div>
                                                    :
                                                    <div className='w-full'>
                                                        <div>Raise Issues:</div>
                                                        <Formik initialValues={{subject:'',main:''}}
                                                        onSubmit={(values)=>sendRequest(values,order.USER_ORDER_ID)}>
                                                            <Form>
                                                                <div className='my-2'>
                                                                    <Field className='px-3 w-full text-[12px] py-2 border outline-none ' placeholder='Subject : refund,exchange?' type='text' name='subject'/>
                                                                </div>
                                                                <div className='my-2'>
                                                                    <Field className='px-3 w-full py-2 text-[12px] border outline-none ' placeholder='Explain your issues...' type='text' as='textarea' name='main' />
                                                                </div>
                                                                <div className=''>
                                                                    <button className='bg-red-400' type='submit'>Request </button>
                                                                </div>
                                                            </Form>
                                                        </Formik>
                                                    </div>
                                                    :
                                                    ''
                                                }
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                            :
                            <div className='w-full h-screen flex flex-col justify-center items-center px-3'>
                                <div id='outofsession' className=''></div>
                                <div className='text-center'>
                                    <h1 className='ss:text-[25px] text-[20px] uppercase bodytext mb-2'>Your Session is over!</h1>
                                    <Link to={'/login'}  ><div className='ss:text-[19px] text-[15px] uppercase tracking-[2px] px-7 bg-[#1D0100] py-2 text-white '  >Login</div></Link>
                                </div>
                            </div>
                    }

                </div>
                <div className='h-20'></div>
            </div>

        </>
    )
}

export default Orders
