import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BsBag } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import '../App.css'
import useAuthStore from '../store/useAuthStore';
import useCartStore from '../store/useCartStore';
import { RiMenu3Line } from "react-icons/ri";
import { CiDeliveryTruck } from "react-icons/ci";
import { LuUserCircle2 } from "react-icons/lu";


const Header = () => {


  const navigate = useNavigate()



  const { isLoggedIn, setLoggedIn } = useAuthStore();
  const totalCartItems = useCartStore((state) => state.totalCartItems);
  const [profileCard, setProfileCard] = useState(false)
  const [menu, setMenu] = useState(false)

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_SERVER_URL}/user/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
          token: localStorage.getItem('token')
        }
      })
    } catch (error) {
      console.log(error)
    }
    localStorage.removeItem('token')
    setLoggedIn(false)
    navigate('/home')
  }



  return (
    <>
      <header className='w-full top-0 sticky bg-background border-b border-outline-variant/30 z-50 transition-all duration-300'>
        <nav className='flex justify-between items-center w-full px-4 md:px-margin-desktop py-4 md:py-6 max-w-container-max mx-auto'>

          <div className='flex items-center gap-8'>
            <Link to={'/home'} className='font-display-lg text-headline-lg text-primary uppercase tracking-tighter'>
              Karma Threads
            </Link>
            <div className='hidden md:flex gap-6 items-center'>
              <Link to={'/home'} className='font-body-md text-body-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300'>Home</Link>
              <Link to={'/shop'} className='font-body-md text-body-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300'>Shop</Link>
              <Link to={'/aboutus'} className='font-body-md text-body-md uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors duration-300'>About</Link>
            </div>
          </div>

          <div className='flex items-center gap-4 md:gap-6'>
            <Link to={'/shop'} className='cursor-pointer transition-all duration-200 hover:opacity-70 flex items-center'>
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>search</span>
            </Link>

            <div className='relative flex items-center'>
              <button onClick={() => setProfileCard(!profileCard)} className='cursor-pointer transition-all duration-200 hover:opacity-70 flex items-center'>
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>person</span>
              </button>

              {profileCard && (
                <div className='absolute top-12 right-0 bg-surface-container-lowest border border-outline-variant/30 shadow-md p-4 flex flex-col w-48 z-[999]'>
                  <div className='absolute bg-surface-container-lowest border border-outline-variant/30 border-b-0 border-r-0 h-4 w-4 right-3 -top-2 rotate-45'></div>
                  {isLoggedIn ? (
                    <>
                      <Link className='font-body-md text-body-md py-2 hover:text-primary transition-colors' to={'/myorders'}>My Orders</Link>
                      <button className='font-body-md text-body-md py-2 text-left hover:text-primary transition-colors' onClick={logout}>Logout</button>
                    </>
                  ) : (
                    <Link className='font-label-sm uppercase tracking-widest bg-primary text-on-primary py-2 px-4 text-center hover:opacity-90 transition-opacity' to={'/login'}>Login</Link>
                  )}
                </div>
              )}
            </div>

            <Link to={'/cart'} className='cursor-pointer transition-all duration-200 hover:opacity-70 flex items-center relative'>
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>shopping_bag</span>
              <span className="absolute -bottom-1 -right-2 bg-primary text-on-primary w-4 h-4 text-[10px] rounded-full flex items-center justify-center font-bold">
                {totalCartItems}
              </span>
            </Link>

            <button onClick={() => setMenu(!menu)} className='md:hidden cursor-pointer transition-all duration-200 hover:opacity-70 flex items-center ml-2'>
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>menu</span>
            </button>

            {menu && (
              <div className='absolute top-[100%] right-0 w-64 bg-surface-container-lowest border border-outline-variant/30 shadow-lg flex flex-col z-[999] p-4 h-[80vh] overflow-y-auto'>
                <div className='w-full flex justify-start flex-col gap-y-4 uppercase'>
                  <Link className='font-body-md text-body-md hover:text-primary transition-colors' to={'/home'}>Home</Link>
                  <Link className='font-body-md text-body-md hover:text-primary transition-colors' to={'/shop'}>Shop</Link>
                  <Link className='font-body-md text-body-md hover:text-primary transition-colors' to={'/aboutus'}>About Us</Link>
                  {isLoggedIn && <Link className='font-body-md text-body-md hover:text-primary transition-colors' to={'/myorders'}>My Orders</Link>}
                </div>
                <div className='mt-10'>
                  {isLoggedIn ? (
                    <button className='font-body-md text-body-md hover:text-primary transition-colors' onClick={logout}>Logout</button>
                  ) : (
                    <Link className='font-label-sm uppercase tracking-widest bg-primary text-on-primary py-2 px-4 text-center block w-full hover:opacity-90 transition-opacity' to={'/login'}>Login</Link>
                  )}
                </div>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
