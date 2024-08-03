import React, { useEffect } from 'react'
import lottie from 'lottie-web';
import { createPortal } from 'react-dom'
import { BsBag } from "react-icons/bs";




const CartAnimation = (blur) => {
    const loadd = () => {
        lottie.loadAnimation({
          container: document.getElementById('cart-animation'), // the DOM element
          renderer: 'svg', // the renderer to use (svg, canvas, html)
          loop: false, // whether to loop the animation
          autoplay: true, // whether to start playing the animation immediately
          path: '/Bag-animation.json' // the path to the animation JSON file
        });
      }

    useEffect(()=>{
        loadd()
    },[])

  return createPortal(
    <>
    <div className='w-screen h-screen z-[9999] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur-xl bg-[#dbd4d472] flex justify-center items-center'>
    {
      blur.blur == 'blur' ? <div><BsBag className='scale-[2]' /></div>: <div id='cart-animation' className=''></div>
    }
    </div>
      
    </>,document.getElementById('animation-portal')
  )
}

export default CartAnimation
