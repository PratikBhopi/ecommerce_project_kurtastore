import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Yup from 'yup'




const Register = () => {
  const navigate = useNavigate()

  const handleRegistration = async ({ firstname, lastname, email, mobile, password, confirmPassword }) => {
    if (confirmPassword != password) {
      toast('Confirm Password must be same as Password')
      return
    }
    try {
      // console.log(firstname,lastname,email,mobile,password,confirmPassword)
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, mobile, password })
      })
      const data = await response.json()
      if (data.status == 200) toast('User Already Exist!')
      if (data.status == 201) {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const mobileNumberRegex = /^[0-9]{10}$/

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    mobile: Yup.string().matches(mobileNumberRegex, 'Mobile Number is not valid').required('Enter Valid Mobile Number')
  })
  return (
    <>
      <div className='w-screen h-screen  flex justify-center items-center relative  overflow-hidden'>
        <div className='bg-[#140403] w-[150vw] -rotate-[60deg] ss:w-full absolute top-[-30px] ss:-top-[30%] h-full ss:-rotate-[39deg] ss:-left-[23%] z-[-1]'></div>
      {/* <div className='w-screen h-screen  flex justify-center items-center relative bg-gradient-to-br from-black via-[#140606f7] to-[#140403] '> */}
        <div className='absolute top-10 left-10 md:top-[20%] md:left-[20%] bg-[#ffffff]  border border-white text-black px-6 py-2 rounded-full'><Link to={'/home'}>Back</Link></div>
        <ToastContainer newestOnTop={true} autoClose={1000}
          toastStyle={{ backgroundColor: "white", color: "black" }} hideProgressBar={true}  />

        <div className=' px-10 py-6 w-full md:w-[40vw] backdrop:blur-lg border shadow-xl border-[#393939d5] border-t-0 border-l-0  bg-[#ffffff]  '>
          <div className='QuoteLines text-[18px] text-center my-4  relative'>
            <div className='text-black'>Create Your Account!</div>
            <div className='mt-1 w-full h-[1px] bg-yellow-800 productCardHeading'></div>
          </div>
          <Formik
            initialValues={{ email: '', password: '', mobile: '', firstname: '', lastname: '', confirmPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleRegistration}>
            <Form>

              <div className='w-full flex ga-2'>

                <div className='my-2 w-1/2 px-3'>
                  <Field
                    placeholder='First Name'
                    className='w-full outline-[#585858a7]  bg-transparent border border-stone-600 py-2 pl-3'
                    name="firstname"
                    type="text"
                    required
                  />
                  <ErrorMessage name="Name" component="div" className="text-red-500 pl-3" />
                </div>
                <div className='my-2 w-1/2 px-3'>
                  <Field
                    placeholder='Last Name'
                    className='w-full outline-[#585858a7]  bg-transparent border border-stone-600 py-2 pl-3'
                    name="lastname"
                    type="text"
                    required
                  />
                  <ErrorMessage name="Name" component="div" className="text-red-500 pl-3" />
                </div>
              </div>

              <div className='my-2 w-full px-3'>
                <Field
                  placeholder='Whatsapp No.'
                  className='w-full outline-[#585858a7]  bg-transparent border border-stone-600 py-2 pl-3'
                  name="mobile"
                  type="text"
                />
                <ErrorMessage name="mobile" component="div" className="text-red-500 pl-3 " />
              </div>

              <div className='my-2 w-full bg-transparent px-3'>
                <Field
                  placeholder='Email'
                  className='w-full  outline-[#585858a7] bg-transparent border border-stone-600 py-2 pl-3'
                  name="email"
                  type="email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 pl-3" />
              </div>
              <div className='my-2 w-full px-3'>
                <Field
                  placeholder='Password'
                  className='w-full outline-[#585858a7] bg-transparent border border-stone-600 py-2 pl-3'
                  name="password"
                  type="password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 pl-3" />
              </div>
              <div className='my-2 w-full px-3 bg-transparent'>
                <Field
                  placeholder='Confirm Password'
                  className='w-full  bg-transparent  outline-[#585858a7]  border border-stone-600 py-2 pl-3'
                  name="confirmPassword"
                  type="password"
                />
              </div>
              <div className='my-2 w-full px-3'>
                <button className='w-full bg-[#1D0100] uppercase tracking-[2px]  py-3 text-white text-[15px] ' type="submit">Create Account</button>
              </div>
            </Form>
          </Formik>

          <div className=' px-4 text-[15px] text-stone-800 mt-2 -translate-y-2 hover:text-blue-700'> <Link to={'/login'}>Already have an account?</Link></div>

        </div>
      </div >
    </>
  )
}

export default Register
