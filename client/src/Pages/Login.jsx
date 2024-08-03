import React, { useContext } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';

import * as Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContextApi } from '../context/UserContext';

const Login = () => {
  const navigate = useNavigate()

  const {setLoggedIn,isLoggedIn} = useContext(UserContextApi)

  const handleLogin=async({email,password})=>{
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/login`,{
        method:'POST',
        headers:{
          'Content-type':'application/json',
        },
        body:JSON.stringify({email,password})
      })
      const data = await response.json()
      if(data.status == 200){
        localStorage.setItem('token',data.token)  
        // setLoggedIn(!isLoggedIn)   
        setLoggedIn(true)   
        navigate('/home')

      }
      
      if(data.status == 404){
        toast('user does not exist')
      }
      if(data.status == 401){
        toast('Incorrect Password')
      }
    } catch (error) {
      toast('Server Timed Out')
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  })
  return (
    <>
      <div className='w-screen h-screen  flex justify-center items-center relative bg-gradient-to-br overflow-hidden '>
      <div className='bg-[#140403] w-[125vw] -rotate-[60deg] ss:w-full absolute top-[-10px] ss:-top-[30%] h-full ss:-rotate-[40deg] ss:-left-[23%] z-[-1]'></div>

      <div className='absolute top-10 left-10 md:top-[20%] md:left-[20%] bg-white  px-6 py-2 rounded-full'><Link to={'/home'}>Back</Link></div>
      <ToastContainer newestOnTop={true} autoClose={1000}
          toastStyle={{ backgroundColor: "white", color: "black" }} hideProgressBar={true} />

        <div className=' backdrop:blur-lg  shadow-md shadow-[#4747479c] px-10 py-6 md:w-[30vw] bg-white text-black '>

        <Formik
         initialValues={{ email: '', password: '' }}
         validationSchema={validationSchema}
         onSubmit={handleLogin}>
          <Form>
          <div className='QuoteLines  w-full text-[18px] text-center font-[500] relative my-10'>
            <div className='text-black'>Enter in our Shop !</div>
            <div className='productCardHeading w-full h-[1px] bg-yellow-800 mt-2'></div>
          </div>
            <div className='my-2 w-full px-3'>
              <Field
                placeholder='Email'
                className='w-full  bg-transparent border border-stone-600 py-2 pl-3'
                name="email"
                type="email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 pl-3" />
            </div>
            <div className='my-2 w-full px-3'>
              <Field
                placeholder='Password'
                className='w-full  bg-transparent border border-stone-600 py-2 pl-3'
                name="password"
                type="password"
              />
              <ErrorMessage name="pass"  component="div" className="text-red-500 pl-2" />
            </div>
            <div className='my-2 w-full px-3'>
              <button className='w-full bg-[#1D0100] uppercase tracking-[2px]  py-2 text-white text-[15px]' type="submit">LogIn</button>
            </div>
          </Form>
        </Formik>
        <div className='w-full text-[13px] pb-3 text-stone-800  px-4 text-end'><Link to={'/login/forget-password'} className='hover:underline opacity-[0.9] hover:text-stone-200'>Forgot Password?</Link></div>
        <div className=' px-4 text-[15px] text-stone-700 -translate-y-2 hover:text-blue-700'> <Link to={'/register'}>Don't have an account?</Link></div>
        </div>
      </div >
    </>
  )
}

export default Login
