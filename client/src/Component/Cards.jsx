import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import { FaBagShopping } from "react-icons/fa6";
import CartAnimation from './CarAnimation';

import {gsap} from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Cards = ({ productsdata}) => {



  const navigate = useNavigate()
  const { isLoggedIn, setLoggedIn } = useAuthStore();
  const getCartProduct = useCartStore((state) => state.getCartProduct);
  const [size, setSize] = useState('')

  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const cols = useRef(null)

  const checkAvailabiltiy = (img)=>{
    const pro = productsdata.Colors.filter(p=>p.img_url == img)
    if(pro.stocks == 0 ) return true
    else false
  }

  
  const addtoCart = async (productid, size, productimg) => {
    // console.log(productimg,size,productid)
    const avail = checkAvailabiltiy(productimg)
    if(avail) {
      toast('Out of stock!')
      return 
    }
    setIsPortalOpen(true)
    

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/cart`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify({ productid, size, productimg })
      })
      const data = await response.json()
      if (data.status == 200) {
        getCartProduct()
        setIsPortalOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addtoStorage = async (productid, size, productimg) => {
    // console.log(productimg,size,productid)
    const avail = checkAvailabiltiy(productimg)
    if(avail) {
      toast('Out of stock!')
      return 
    }
    setIsPortalOpen(true)
    

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/cart`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
          token: 'unknownuser',
        },
        body: JSON.stringify({ productid, size, productimg })
      })
      const data = await response.json()
      if (data.status == 200) {
        getCartProduct()
        setIsPortalOpen(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const notify = () => {
    toast('Kindly Log In')
  }

  const buyProduct = (productid) => {
    navigate('/buyproduct/' + productid)
  }
  
  useEffect(()=>{
    gsap.from(cols.current, {
      duration: 1,
      opacity: 0,
      width: 0,
    })

  },[])

  return (
    <>
      <div className='group product-card-hover transition-all duration-500 p-2 sm:p-4 cursor-pointer w-full' onClick={() => buyProduct(productsdata.PRODUCT_id)}>
        <ToastContainer newestOnTop={true} autoClose={1000}
          toastStyle={{ backgroundColor: "white", color: "black" }} hideProgressBar={true} />
        
        <div className='relative overflow-hidden aspect-[3/4] mb-4 sm:mb-6 gold-border'>
          <img 
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105' 
            src={productsdata.Product_img_url} 
            alt={productsdata.Description} 
          />
          
          <div className='absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 sm:p-6'>
            <button 
              onClick={(e) => {
                e.stopPropagation(); // prevent navigating to product page when adding to cart
                addtoCart(productsdata.PRODUCT_id, size, productsdata.Product_img_url);
              }}
              className='w-full bg-primary text-on-primary py-3 sm:py-4 text-label-sm uppercase tracking-widest font-bold opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'
            >
              Add to Bag
            </button>
          </div>
          
          {/* Colors Tag */}
          <div className='absolute top-3 left-3 flex gap-1'>
            {productsdata.Colors.slice(0, 3).map((color, index) => (
              <div 
                key={color.hexcode} 
                style={{backgroundColor: color.hexcode}} 
                className='w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-white/50 shadow-sm'
              ></div>
            ))}
            {productsdata.Colors.length > 3 && (
              <div className='text-[10px] bg-white/80 px-1 rounded-sm text-primary font-bold ml-1'>
                +{productsdata.Colors.length - 3}
              </div>
            )}
          </div>
        </div>

        <div className='text-center px-1'>
          <p className='text-[10px] sm:text-label-sm uppercase tracking-widest text-outline mb-1 truncate'>
            Karma Threads
          </p>
          <h3 className='font-title-md text-[14px] sm:text-title-md text-primary mb-1 sm:mb-2 truncate'>
            {productsdata.Description}
          </h3>
          <div className='flex items-center justify-center gap-2'>
             <p className='font-body-md text-[12px] sm:text-body-md text-secondary'>₹ {productsdata.Discounted_Price}</p>
             <p className='text-[10px] sm:text-[12px] text-outline line-through'>₹ {productsdata.Price}</p>
          </div>
        </div>

        {isPortalOpen ? <CartAnimation /> : null}
      </div>
    </>
  )
}

export default Cards
