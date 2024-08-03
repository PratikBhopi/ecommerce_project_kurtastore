import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsBag } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import '../App.css'
import { UserContextApi } from '../context/UserContext';
import { RiMenu3Line } from "react-icons/ri";
import { CiDeliveryTruck } from "react-icons/ci";
import { LuUserCircle2 } from "react-icons/lu";


const Header = () => {


  const navigate = useNavigate()



  const { isLoggedIn, setLoggedIn, totalCartItems } = useContext(UserContextApi)
  const [profileCard, setProfileCard] = useState(false)
  const [menu, setMenu] = useState(false)

  const logout = async () => {
    localStorage.removeItem('token')
    setLoggedIn(false)
    navigate('/home')
  }



  return (
    <>
      <div className='w-screen px-5 lg:px-10 py-2 pt-3 bodytext ss:py-1 lg:py-[10px] ss:bg-[#ffffff] border-b bg-white ss:text-black'>
        <div className='flex justify-between w-full'>

          <div className='flex  gap-5 items-center text-[16px]'>
            <div className='subtextLines text-yellow-600  px-2 py-2 ss:text-[25px]   text-[18px]  md:block'><Link to={'/home'}><span className='QuoteLines'>A</span>awara Ethnic</Link></div>
            <div className='hover:underline transition-all ease-in hidden md:block uppercase  duration-500'><Link to={'/home'}>Home</Link></div>
            <div className='hover:underline transition-all ease-in hidden md:block uppercase duration-500'><Link to={'/aboutus'}>About Us</Link></div>
            <div className='hover:underline transition-all ease-in hidden md:block uppercase duration-500'><Link to={'/shop'}>Shop</Link></div>
          </div>

          <div className='flex gap-6 items-center relative'>
            <Link to={'/shop'}>
              <div className='scale-[1.8] font-[800]'><CiSearch /></div>
            </Link>

            {
              isLoggedIn
                ?
                <>
                  <Link className='hidden ss:block' to={'/myorders'}>
                    <div className='scale-[1.8] cursor-pointer ml-1 font-[800] translate-y-[2px] '><CiDeliveryTruck /></div>
                  </Link>
                  <div className=' relative' >
                    <Link to={'/cart'}><BsBag className='scale-[1.4] font-[300]' /></Link>
                    <div className='absolute -bottom-2 -right-3  bg-[#000000e7] text-white w-4 h-4 text-[10px] rounded-full text-center'>{totalCartItems}</div>
                  </div>
                  <div className='hidden ss:block relative' >
                    <div onClick={() => setProfileCard(!profileCard)} className='scale-[1.8] cursor-pointer ml-1 font-[800] translate-y-[2px] '><LuUserCircle2 /></div>
                    {
                      profileCard
                        ?

                        <div className='absolute bottom-[-150px] py-4 px-5  flex flex-col justify-between  w-[260px] h-[120px] right-[-8px] z-[999] bg-white border'>
                          <div className='absolute bg-white border h-5 right-2 border-b-0 border-r-0 -top-[10px] rotate-45 w-5'></div>
                          <div className='mb-10'>
                            {isLoggedIn
                              ?
                              <div className='bg-stone-100 px-3 py-2 cursor-pointer rounded-md' onClick={logout}>Logout</div>
                              :
                              ''
                            }
                          </div>
                        </div>
                        :
                        ''
                    }
                  </div>
                </>
                :
                <Link className='bg-[#1D0100] text-white shadow-md px-4 py-[6px] rounded-full text-[15px]' to={'/login'}><div>Login</div></Link>
            }


            <div onClick={() => setMenu(!menu)} className='text-black block ss:hidden  text-[18px]'><RiMenu3Line /></div>

            {
              menu
                ?

                <div className='absolute bottom-[-80vh] py-4 px-5  flex flex-col justify-between  w-[260px] h-[80vh] right-[-8px] bg-white border'>
                  <div className='absolute bg-white border h-5 right-2 border-b-0 border-r-0 -top-[10px] rotate-45 w-5'></div>
                  <div className='w-full flex justify-start flex-col py-10  text-[20px] gap-y-5 uppercase'>
                    <Link className='hover:bg-stone-50 px-3 py-2 rounded-md' to={'/home'}>Home</Link>
                    <Link className='hover:bg-stone-50 px-3 py-2 rounded-md' to={'/shop'}>Shop</Link>
                    <Link className='hover:bg-stone-50 px-3 py-2 rounded-md' to={'/aboutus'}>About Us</Link>
                    <Link className='hover:bg-stone-50 px-3 py-2 rounded-md' to={'/myorders'}>My Orders</Link>
                  </div>
                  <div className='mb-10'>
                    {isLoggedIn
                      ?
                      <div className='bg-stone-100 px-3 py-2 rounded-md' onClick={logout}>Logout</div>
                      :
                      ''
                    }
                  </div>
                </div>
                :
                ''
            }


          </div>

        </div>
      </div>
    </>
  )
}

export default Header
