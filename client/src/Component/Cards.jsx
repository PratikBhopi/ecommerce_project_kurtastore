import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import { UserContextApi } from '../context/UserContext'

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
  const { isLoggedIn, setLoggedIn, getCartProduct } = useContext(UserContextApi)
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
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/addtoCart`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
          token: localStorage.getItem('token')
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
      <div className='f:w-[300px] relative  s:w-[270px]   sl:w-[220px] ss:w-[190px] w-[160px]  flex justify-center items-center flex-col'>
        <ToastContainer newestOnTop={true} autoClose={1000}
          toastStyle={{ backgroundColor: "white", color: "black" }} hideProgressBar={true} />
        <div className='f:w-[300px] f:h-[448px] s:w-[270px] s:h-[404px] sl:w-[220px] sl:h-[328px] border  border-b-0 border-[#2323233c] ss:w-[190px] ss:h-[280px] w-[160px] h-[240px] rounded-[0px]  overflow-hidden relative'>
          <div className='bg-[#1D0100]  ss:flex justify-center  text-white  absolute right-1 top-1 ss:right-2 ss:top-2  z-[99]  rounded-[6px]   text-[10px] ss:text-[13px] py-3 px-2 ss:w-[14%] cursor-pointer' onClick={() => { isLoggedIn ? addtoCart(productsdata.PRODUCT_id, size, productsdata.Product_img_url) : notify() }}><FaBagShopping className='scale-[1.2]' /></div>
          <img  className='w-full bg-stone-200 hover:scale-[1.01] transition-all ease-out duration-[0.9s] h-full z-50  ' src={productsdata.Product_img_url} alt='Network!!' />
          <div onClick={()=>buyProduct(productsdata.PRODUCT_id)} className='absolute cursor-pointer bottom-2 w-full   px-3 '>
            <div ref={cols} className='w-full text-end bg-[#ffffff4a] rounded-full backdrop-blur-sm px-1 py-1  ss:px-2 ss:py-2 relative'>
            
            {   
              productsdata.Colors.map((color,index)=>{  
                return <div key={color.hexcode} style={{backgroundColor:`${color.hexcode}`,zIndex:index,left:index*18+4+'px'}} className={`ss:w-7  w-6 opacity-[1]    top-1/2 -translate-y-1/2 ss:h-7 h-6  absolute inset-0  rounded-full`}></div>
              })
            }
            <div   className='ss:text-[15px] text-[13px] font-[700] text-[#1D0100]'>{ productsdata.Colors.length-1 == 0 ? 'see more..': `+${productsdata.Colors.length} colors`} </div>
            </div>
          </div>
        </div>
        <div className='w-full  text-[11px] px-[4px] text-black flex flex-col justify-center items-center  ss:text-[16px]   '>
          <div className='uppercase ss:font-[700] opacity-[0.7]  font-[800]'>Aawara Ethnic </div>
          <div className='uppercase  text-center w-full whitespace-nowrap truncate  text-[12px] text-[#b0b0b0] font-[300]'>{productsdata.Description}</div>
          <div className=' flex gap-1 items-center'>
            <div className=' line-through ss:text-[15px] text-red-600 text-[12px] opacity-[0.6]'> ₹ {productsdata.Price}</div>
            <div className=' ss:text-[17px] text-[15px] font-[600]'>₹ { productsdata.Discounted_Price}/-</div>
          </div>


          <div className='my-2 w-full  ss:justify-center hidden  ss:flex gap-1'>
            {
              [{ XS: 34 }, { S: 36 }, { M: 38 }, { L: 40 }, { XL: 42 }, { XXL: 44 }].map((item, index) => {
                const brandSize = Object.keys(item)[0]; // Get the key from the object
                const value = item[brandSize]; // Get the value from the object
                return (
                  <div onClick={() => setSize(brandSize)} key={value} style={{ backgroundColor: size == brandSize ? 'rgb(78 78 78 / 48%)' : 'transparent' }} className='py-1 px-2 rounded-full  cursor-pointer text-center border border-stone-300 ss:text-[11px]  text-[7px] uppercase'>{brandSize}</div>
                );
              })
            }
          </div>
        </div>
        <div className='flex  justify-between mt-1 w-full '>
          <div className='bg-[#1D0100] border text-center text-white  px-2 text-[15px] ss:text-[18px] py-[6px] w-full  cursor-pointer  bttn ' onClick={() => buyProduct(productsdata.PRODUCT_id)} >Buy </div>
        </div>
        {
          isPortalOpen ? <CartAnimation  /> : ''
        }
      </div>
    </>
  )
}

export default Cards
