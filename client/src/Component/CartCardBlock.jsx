import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineCancel } from "react-icons/md";
import { UserContextApi } from '../context/UserContext';
import CartAnimation from './CarAnimation';

const CartCardBlock = ({ productsdata, getCartProduct }) => {

  // const {getCartLength} = useContext(UserContextApi)
  const [isPortalOpen, setIsPortalOpen] = useState(false);

  const [quantityCount, setQuantityCount] = useState(productsdata.Quantity);
  const finalPrice = productsdata.Price * quantityCount;

  const updateCart = async (newQuantity) => {
    setIsPortalOpen(true)
    try {
      const product_item_id = productsdata.product_id+'-'+productsdata.Size+'-'+productsdata.Color
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/updateCart`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({ product_item_id ,quantityCount: newQuantity, finalPrice: productsdata.Price * newQuantity })
      });
      const data = await response.json()
      if(data.status == 200 ){
      getCartProduct();
      setIsPortalOpen(false)
      }
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const deleteItem = async (productid) => {
    // console.log(color)
    setIsPortalOpen(true)
   const encodedColor = encodeURIComponent(productid); // Example color hex code

    const url = `${import.meta.env.VITE_SERVER_URL}/user/deleteCartItem/${encodedColor}`
    // console.log(url)
    try {
      const response = await fetch(url,{
        method:'DELETE',
        headers:{
          token:localStorage.getItem('token')
        }
      })
      getCartProduct()
      setIsPortalOpen(false)
    } catch (error) {
      console.log('deleteitem ',error)
    }
  }

  const handleQuantityChange = (change) => {
    const newQuantity = Math.max(1, quantityCount + change);
    setQuantityCount(newQuantity);
    getCartProduct()
  };

  useEffect(() => {
    // setIsPortalOpen(true)

    updateCart(quantityCount);
  }, [quantityCount]);

  return (
    <>
    
      <div className='max:w-[100vw] border-b-[2px] border-b-[#aca9a9] hidden grid-cols-8 s:grid items-center text-stone-600 relative'>
      {
          isPortalOpen ? <CartAnimation blur={'blur'}/> : ''
        }
        <div className='flex w-full justify-center'>
          <MdOutlineCancel onClick={()=>deleteItem(productsdata.product_id)} className='text-stone-500 font-[200] text-[18px] cursor-pointer' />
        </div>
        <div className='h-[110px] w-[100%] my-3'><img className='w-full h-full' src={productsdata.product_img_url} alt="" /></div>
        <div className='col-span-2  pl-4 text-stone-800 font-[500]'>
          <div className='pr-[1px] uppercase'>   {productsdata.product_name}</div>
          <div>{productsdata.Size} </div>
          {/* <div className='w-6 py-3 rounded-full opacity-[0.5]' style={{backgroundColor:productsdata.Color}}> </div> */}
        </div>
        <div>{'₹' + productsdata.Price}</div>
        <div className='col-span-2'>
          <div className='border border-stone-400 bg-[#eceaea32] flex w-fit overflow-hidden rounded-[2px] my-3'>
            <div onClick={() => handleQuantityChange(-1)} className='px-3 cursor-pointer flex justify-center items-center text-[20px]'>-</div>
            <div className='border-l border-r border-stone-700 flex items-center justify-center w-10'>{quantityCount}</div>
            <div onClick={() => handleQuantityChange(1)} className='cursor-pointer px-2 flex justify-center items-center text-[20px]'>+</div>
          </div>
        </div>
        <div>{'₹' + finalPrice}</div>
      </div>

      <div className='w-full border s:hidden block'>
     
        <div className='w-full flex justify-end  pr-5 py-2 bg-red-100'>
          <MdOutlineCancel onClick={()=>deleteItem(productsdata.product_id)} className='text-stone-500 scale-[1.4]' />
        </div>
        <div className='w-full flex justify-center items-center py-4'>
          <div className='h-[180px] w-[120px] '><img className='w-full h-full' src={productsdata.product_img_url} alt="" /></div>
        </div>
        <div className='flex justify-between px-2 border-b py-2 border-t'>
          <div>Product:</div>
          <div className='font-[500]'>{productsdata.product_name}</div>
        </div>
        <div className='flex justify-between px-2 border-b py-2 border-t'>
          <div>Size:</div>
          <div className='font-[500]'>{productsdata.Size}</div>
        </div>
        <div className='flex justify-between px-2 border-b py-2'>
          <div>Price:</div>
          <div>{'₹' + productsdata.Price}</div>
        </div>
        <div className='flex items-center justify-between px-2 border-b'>
          <div>Quantity:</div>
          <div>
            <div className='border border-slate-300 flex w-fit overflow-hidden my-3'>
              <div onClick={() => handleQuantityChange(-1)} className='px-3 cursor-pointer flex justify-center items-center text-[20px]'>-</div>
              <div className='border-l border-r border-stone-700 flex items-center justify-center w-10'>{quantityCount}</div>
              <div onClick={() => handleQuantityChange(1)} className='cursor-pointer px-2 flex justify-center items-center text-[20px]'>+</div>
            </div>
          </div>
        </div>
        <div className='flex justify-between px-2 py-2 border-b border-t'>
          <div className='font-[500]'>Subtotal:</div>
          <div>{'₹' + finalPrice}</div>
        </div>
      </div>

    </>
  );
};

export default CartCardBlock;
