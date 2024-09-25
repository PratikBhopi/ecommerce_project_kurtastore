import React, { useState } from 'react'
import { IoLogoWhatsapp } from "react-icons/io";


const WhatsappChat = () => {
    const [show, setShow] = useState(false)
    return (
        <div onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)} className="fixed bottom-7 z-[99]  right-5 hover:animate-bounce">
            <div className='relative'>
                {show && <div className='absolute bg-white right-14 py-1 text-green-500 text-center top-1/2 -translate-y-1/2 border block w-[160px]'>Chat On Whatsapp!</div>
                }
                <a href="https://wa.me/7620985308" target='_blank'>
                    <div className='px-3 py-3 bg-white border rounded-full animate-pulse  delay-500'>
                        <IoLogoWhatsapp className='scale-[2] text-green-600' />
                    </div>
                </a>
            </div>

        </div>
    )
}

export default WhatsappChat
