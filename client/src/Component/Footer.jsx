import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className='w-screen  py-10 px-10 bg-gradient-to-b bodytext bg-white border-t   flex flex-wrap flex-col items-center  justify-center content-center ' >
      <div className='subtextLines text-yellow-600  px-2 py-2 text-[20px]'><Link to={'/home'}><span className='QuoteLines'>A</span>awara <span className='QuoteLines'>E</span>thnic</Link></div>

        <div className='flex gap-4 ss:w-full  w-[85vw] flex-wrap justify-center ss:text-[13px] text-[11px] '>
          <Link to={'/'}><div className='hover:underline transition-all'>Contact Us</div></Link>
          <Link to={'/privacypolicy'}><div className='hover:underline transition-all'>Privacy Policy</div></Link>
          <Link to={'/shippingpolicy'}><div className='hover:underline transition-all'>Shipping Policy</div></Link>
          <Link to={'/exchangepolicy'}><div className='hover:underline transition-all'>Exchange Policy</div></Link>
          <Link to={'/cancelationpolicy'}><div className='hover:underline transition-all'>Cancelation Policy</div></Link>
          <Link to={'/termsandcondition'}><div className='hover:underline transition-all'>Terms and Condition</div></Link>
         
    

      </div>
      </div>

      <div className='w-screen flex justify-center py-3 text-center tracking-[1px] bg-white text-black text-[11px] ss:text-[14px]'>Copyright 2024 © AAWARA ETHNIC | All Rights Reserved </div>
    </>
  )
}

export default Footer
