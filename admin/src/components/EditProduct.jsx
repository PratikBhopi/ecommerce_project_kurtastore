import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdCancel } from 'react-icons/md';

const EditProduct = ({ item, setPortal, openPortal, getProducts }) => {

  const [id, setId] = useState(item.PRODUCT_id)

  const updateProduct = async (values) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/updateProduct`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
          'token': sessionStorage.getItem('token')
        },
        body: JSON.stringify({ values, id })
      })
      const data = await response.json()
      if (data.status == 200) {
        toast('Product updated')
        getProducts()
        setPortal(false)
      }
    } catch (error) {

      toast('Some error Occurred')
    }
  }

  const updateStock = async(values)=>{

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/updateStock`,{
        method:'POST',
        headers:{
          'Content-type':'Application/json',
          token:sessionStorage.getItem('token')
        },
        body:JSON.stringify({values})
      })
      const data = await response.json()
      if(data.status == 200){
        toast('Stock Updated')
      }else{
        toast('some error occured')
      }


    } catch (error) {
        toast('server timedout')
    }
  }

  return (
    <div className='absolute flex items-center  z-[99] top-10 left-0 py-10 w-full px-10'>
      <ToastContainer />
      <div className='w-full bg-[#4f4f4fd3]  backdrop-blur-md'>
        <div className='w-full bg-black text-white py-2 flex justify-end '><div onClick={() => setPortal(!openPortal)}  className=' pr-3' ><MdCancel className='scale-[1.3] cursor-pointer'/></div></div>
        <div className='flex items-center justify-between'>
          <div className='w-[45%] '>
            <Formik
              initialValues={{
                product_name: item.Product_name, price: item.Price, discounted_price: item.Discounted_Price
              }}
              onSubmit={updateProduct}>
              <Form className='px-10 py-10'>
                <h1 className='text-red-700 bg-white w-fit px-10 py-2 text-[18px] '>Edit Product Details</h1>
                <div className='w-[300px] border my-2'>
                  <Field className='w-full px-4 py-2 outline-none border-none' name='product_name' placeholder='Product Name' />
                </div>
                <div className='w-[300px] border my-2'>
                  <Field className='w-full px-4 py-2 outline-none border-none' name='price' placeholder='Price' />
                </div>
                <div className='w-[300px] border my-2'>
                  <Field className='w-full px-4 py-2 outline-none border-none' name='discounted_price' placeholder='Discounted Price' />
                </div>
                <div className='w-[300px]  my-2'>
                  <button type='submit' className='w-full bg-black text-white py-2 px-3'>Submit </button>
                </div>
              </Form>
            </Formik>
          </div>

          <div className='w-[45%] px-10'>
            <Formik initialValues={{productid:'',color:'',outofstock:''}}
            onSubmit={updateStock}>
              <Form>
              <h1 className='text-red-700 bg-white w-fit px-10 py-2 text-[18px] '>Out of stock size:</h1>
                <div className='w-[300px]  my-2'>
                  <Field type='text' name='productid' placeholder='Product_ID' className='py-2 px-2 w-full outline-none' />
                </div>
                <div className='w-[300px]  my-2'>
                  <Field type='text' name='color' placeholder='color' className='py-2 px-2 w-full outline-none' />
                </div>
                <div className='w-[300px]  my-2'>
                  <Field type='text' name='outofstock' placeholder='Out Of Stock Size' className='py-2 px-2 w-full outline-none' />
                </div>
                <button type='submit' className='w-[300px] py-2 text-white bg-black'>Submit</button>
              </Form>
            </Formik>
          </div>
        </div>

      </div>

    </div>
  )
}

export default EditProduct
