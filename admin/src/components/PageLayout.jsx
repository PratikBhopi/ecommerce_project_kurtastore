import React from 'react'
import { Link, createRoutesFromChildren } from 'react-router-dom'

const PageLayout = ({children,title}) => {
    return (
        <>
            <div className='w-screen h-screen overflow-hidden'>
                <div className='w-full h-full flex  '>
                    <div className='leftSide w-[20%] h-full bg-white'>
                        <div className='w-full h-full px-5'>
                        <Link to={'/allusers'}><div className=' my-2 py-1 px-2 rounded-sm hover:bg-stone-300 '>Users</div></Link>
                        <Link to={'/products'}><div className=' my-2 py-1 px-2 rounded-sm hover:bg-stone-300 '>Products</div></Link>
                        <Link to={'/orders'}><div className=' my-2 py-1 px-2 rounded-sm hover:bg-stone-200 '>Orders</div></Link>
                        <Link to={'/addproduct'}><div className=' my-2 py-1 px-2 rounded-sm hover:bg-stone-200 '>Add Product</div></Link>
                        </div>
                    </div>
                    <div className='rightSide w-[80%] h-full bg-stone-100'>
                        <div className='w-full h-full'>
                            <div className='w-full pl-2 py-3 text-[22px]  font-[500]  bg-white'>{title}</div>
                            <div className='overflow-y-scroll h-screen pb-[200px] '>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default PageLayout
