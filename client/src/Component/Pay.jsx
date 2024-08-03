import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


const Pay = ({cartItems,cartTotalPrice,CARTID ,off}) => {
    

    const navigate = useNavigate()


    const loadRazorpayScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const displayRazorpay = async (totalprice,CARTID) => {
        const res = await loadRazorpayScript('https://checkout.razorpay.com/v1/checkout.js');

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/createOrder`, { totalprice,CARTID });

        if (!result) {
            alert('Server error. Are you online?');
            return;
        }

        const { amount, orderID ,currency} = result.data;

        const options = {
            key: import.meta.env.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency:currency,
            name: 'Aawara Ethnic',
            description: 'Test transaction',
            order_id: orderID,
            handler: async (response) => {
                // console.log(response)
                const data = {
                order_creation_id:orderID,
                paymentid:response.razorpay_payment_id,
                orderid:response.razorpay_order_id,
                sign:response.razorpay_signature,
                cartID:CARTID
                }
            const result = await axios.post(`${import.meta.env.VITE_SERVER_URL}/user/payment-success`,data)
            if(result.data.success){
                sessionStorage.removeItem('#verifieditems')
                sessionStorage.removeItem('#verifieddet')
                sessionStorage.removeItem('form1Data')
                sessionStorage.removeItem('form2Data')
                navigate('/user/successful-order')
            }
            },
            prefill: {
                name: '',
                email: 'pkbhopi@gmail.com',
                contact: '9999999999'
            },
            notes: {
                address: 'Razorpay Corporate Office'
            },
            theme: {
                color: '#3399cc'
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };
   
   
    


  return (
    <>
    <div className='w-full  flex justify-center  '>
    <ToastContainer className='z-[999999999]' newestOnTop={true} autoClose={1000}
          toastStyle={{ backgroundColor: "white", color: "black" }} hideProgressBar={true} />

            <div className='w-full cursor-pointer bg-[#1D0100] hover:bg-white  hover:text-black text-white border  hover:border-black py-3'>

        <button  onClick={
            ()=>{
                if(off){
                    toast('Please Sumbit Your Details.')
                }else{
                displayRazorpay(cartTotalPrice,CARTID)
                }
                }}
                 className='w-full  uppercase bodytext  text-[14px]'>Place order</button>
            </div>
        

    </div>
      
    </>
  )
} 

export default Pay
