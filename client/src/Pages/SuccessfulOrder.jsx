import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import lottie from 'lottie-web';

const SuccessfulOrder = () => {
  const [loading, setLoading] = useState(true)

  const loadd = () => {
    lottie.loadAnimation({
      container: document.getElementById('containerforloader'), // the DOM element
      renderer: 'svg', // the renderer to use (svg, canvas, html)
      loop: false, // whether to loop the animation
      autoplay: true, // whether to start playing the animation immediately
      path: '/loader.json' // the path to the animation JSON file
    });
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  }
  useEffect(() => {
    loadd()
  }, [])

  return (
    <div className='w-screen h-screen bg-[#efefef] flex justify-center items-center relative overflow-hidden  selection:bg-emerald-800 selection:text-white'>
      <div style={{ borderRadius: '0% 0% 50% 50% / 85% 83% 18% 15% ', background: !loading ? 'linear-gradient(to bottom, #10B981, #00C1A2) ' : '#efefef' }} className='bg-[#1d010031] absolute top-0 w-screen h-[40%]  ss:h-[62%]'>
        <div className='w-full relative flex justify-center items-center h-full text-white'>
          <div id='containerforloader' className='absolute top-0'></div>
          <div className='absolute top-0 text-center bodytext mt-5 text-[10px] ss:text-[18px] '>
            <h1>Thank you for your purchase!</h1>
            <p>Your order has been successfully placed.</p>

          </div>

          {
            !loading && <div className='translate-y-[60%] ss:translate-y-[85%] py-10 px-10'>
              <div className='QuoteLines text-center py-3 text-[18px] ss:text-[30px] '>Order Placed!</div>
              <div className='w-full flex justify-center '>
                <div>
                  <div className='bg-white text-[#00C1A2] py-2  text-center border-b px-10 text-[20px] '>
                    <Link className='py-2 animate-pulse' to={'/myorders'}>Check Your Order</Link>
                  </div>
                  <div className='mt-10 w-full text-white py-2 text-center text-[20px] bg-[#00C1A2] cursor-pointer px-10'>
                    <Link className='py-2' to={'/shop'}>Shop More!</Link>
                  </div>

                </div>
              </div>
            </div>
          }

        </div>

      </div>
      <p className='text-[13px] absolute bottom-5 left-5 px-5 text-center'>🟢 If you have any questions or concerns, please contact our support team at aawaraethnic@gmail.com or call us at +91 7499219587.</p>

    </div>
  )
}

export default SuccessfulOrder
