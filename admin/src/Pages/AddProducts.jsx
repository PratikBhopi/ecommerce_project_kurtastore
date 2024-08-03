import React, { useState } from 'react'
import PageLayout from '../components/PageLayout'
import { Formik, Form, Field } from 'formik'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProducts = () => {


    const handleSendData = async (values) => {
        const formData = new FormData();
        formData.append('PRODUCT_id', values.PRODUCT_id);
        formData.append('Product_name', values.Product_name);
        formData.append('Description', values.Description);
        formData.append('Price', values.Price);
        formData.append('Discounted_Price', values.Discounted_Price);
        formData.append('Product_Hexcode', values.Product_Hexcode);
        formData.append('Product_Color',values.product_color);
        formData.append('stocks',values.stocks)
        formData.append('image', values.image);
        // console.log(formData)
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/addproduct`, {
                method: 'POST',
                headers: {
                    token: sessionStorage.getItem('token')
                },
                body: formData
            })
            const data = await response.json()
            if(data.status == 200){
                toast('Product Added Successfully!')
            }else if(data.status == 404){
                toast("not authorised")
            }else if(data.status==409){
                toast('The Product already exists. Kindly Check ID!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const addcolor = async (values)=>{
        const formData = new FormData()
        formData.append('color',values.color)
        formData.append('hexcode',values.hexcode)
        formData.append('PRODUCT_id',values.productid)
        formData.append('stocks',values.stocks)
        formData.append('image',values.image)

        console.log(formData)
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/addcolor`,{
                method:'POST',
                body:formData
            })
            const data = await response.json()
            if(data.status == 200) toast('Product Updated!')
            else if(data.status == 404) toast('Error Product ID is not Valid!')
        } catch (error) {
            console.log(error)
            toast('Some Error Occurred')
        }
    }



    return (
        <>
            <PageLayout title={'Add Products!'}>
                <div className='w-full'>
                <ToastContainer />

                    <div className="px-4 py-2">
                        <div className="px-[10vw]" >

                        <Formik
                            initialValues={{ PRODUCT_id: '', Product_name: '', Description: '',stocks:'', Price: '', Discounted_Price: '',product_color:'',Product_Hexcode:'',image:null }}
                            onSubmit={handleSendData}
                        >
                            {({ setFieldValue }) => (
                                <Form>
                                    <div>
                                        <div className="inputField w-full my-2">
                                            <Field className="w-full px-2 py-2  border-[#666666b5] border" name="PRODUCT_id" type="text" placeholder="Product ID" />
                                        </div>
                                        <div className="inputField w-full my-2">
                                            <Field className="w-full px-2 py-2 border-[#666666b5] border" name="Product_name" type="text" placeholder="Product Name" />
                                        </div>
                                        <div className="inputField w-full my-2">
                                            <Field className="w-full px-2 py-2 border-[#666666b5] border" name="product_color" type="text" placeholder="Product Color" />
                                        </div>
                                        <div className="inputField w-full my-2">
                                            <Field className="w-full px-2 py-2 border-[#666666b5] border" name="stocks" type="number" placeholder="Stocks (total quantity):" />
                                        </div>
                                        <div className="inputField w-full my-2">
                                            <Field className="w-full px-2 py-2 border-[#666666b5] border" name="Product_Hexcode" type="text" placeholder="Product Hexcode" />
                                        </div>
                                        <div className="inputField w-full my-2">
                                            <Field className="w-full px-2 py-2 border-[#666666b5] border" name="Description" type="text" placeholder="Description" />
                                        </div>
                                        <div className="inputField w-full my-2 flex justify-between gap-3">
                                            <Field className="w-full px-2 py-2 border-[#666666b5] border" name="Price" type="number" placeholder="Price" />
                                            <Field className="w-full px-2 py-2 border-[#666666b5] border" name="Discounted_Price" type="number" placeholder="Discounted Price" />
                                        </div>
                                        <div>Upload Image:</div>
                                        <div className="my-1">
                                            <input  onChange={(event) => {
                                                    setFieldValue("image", event.currentTarget.files[0]);
                                                }} className="w-full px-2 py-2 border-[#666666b5] border" name="image" type="file" />
                                        </div>
                                        <div className="w-full">
                                            <input type="submit" className="w-full active:scale-[0.99] active:bg-blue-400 bg-black text-center py-2 text-white text-[18px] font-[500]" value="Submit" />
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        </div>

                        
                        <div className="px-[10vw]">

                        <Formik
                            initialValues={{ productid:'',color: '', hexcode: '',stocks:'',image:null }}
                            onSubmit={addcolor}
                        >
                            {({ setFieldValue }) => (
                        <Form >
                                         <div  className='py-4 my-2 text-[14px]'>
                                            <div className='text-[18px]'>Color:</div>
                                            <div className='inputField w-full my-2'>
                                                <Field className='w-full px-2 py-2  border' name='productid' type="text" placeholder={`Product ID:`} />
                                            </div>
                                            <div className='inputField w-full my-2'>
                                                <Field className='w-full px-2 py-2  border' name='color' type="text" placeholder={`Product Color:`} />
                                            </div>
                                            <div className='inputField w-full my-2'>
                                                <Field className='w-full px-2 py-2  border' name='hexcode' type="text" placeholder={`Product HEXCODE:`} />
                                            </div>
                                            <div className='inputField w-full my-2'>
                                                <Field className='w-full px-2 py-2  border' name='stocks' type="text" placeholder={`Stocks:`} />
                                            </div>
                                            <div className='inputField w-full my-2'>
                                                <input onChange={(event) => {
                                                    setFieldValue("image", event.currentTarget.files[0])}}
                                                className='w-full px-2 py-1  border' name='image' type="file" />
                                            </div>
                                            <div className='w-full bg-black text-white text-[19px] font-[500]'>
                                                <input className='w-full py-2 active:bg-blue-500 active:scale-[0.99]' type="submit" value='Submit' />
                                            </div>
                                        </div>
                                    

                        </Form>)}
                        </Formik>
                        </div>

                    </div>
                </div>
            </PageLayout>

        </>
    )
}

export default AddProducts
