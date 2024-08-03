import React from 'react'
import {Formik , Form , Field} from 'formik'
import { useNavigate } from 'react-router'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const navigate = useNavigate()

    const searchadmin = async ({email,password,adminKey})=>{

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/authenticationadmin`,{
                method:'POST',
                headers:{'Content-type':'Application/json'},
                body:JSON.stringify({email,password,adminKey})
            })
            const data = await response.json()
            if(data.status == 200){
                sessionStorage.setItem('token',data.token)
                navigate('/adminpage')
            }else{
                toast('incorrect credentials')
            }

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
      <div className='w-screen h-screen bg-stone-50 flex  justify-center items-center'>
        <div className='w-[40%] px-3 py-4 bg-white rounded-md shadow-lg'>
            <ToastContainer  pauseOnHover={false} autoClose={2000} hideProgressBar={true} />
        <div className='my-4 text-2xl  text-yellow-800 py-3 text-center font-[600]'>Aawara Ethincs : Admin Panel</div>
        <div className=''>
            <Formik 
            initialValues={{email:'',password:'',adminKey:''}}
            onSubmit={searchadmin}>
                <Form>
                    <div className=' my-2'>
                        <Field name='email' type='text' placeholder='Email' className='w-full pl-2 py-3 rounded-sm border border-stone-400' />
                    </div>
                    <div className=' my-2'>
                        <Field name='password' type='password' placeholder='Password' className='w-full pl-2 py-3 rounded-sm border border-stone-400' />
                    </div>
                    <div className=' my-2'>
                        <Field name='adminKey' type='text' placeholder='Admin ID' className='w-full pl-2 py-3 rounded-sm border border-stone-400' />
                    </div>
                    <div className=' my-2'>
                        <input  type='submit' value='Submit' className='w-full active:scale-[0.9] active:bg-blue-500 pl-2 py-3 bg-black text-white text-[20px] font-[600] rounded-sm ' />
                    </div>
                </Form>
            </Formik>
        </div>
        </div>  
      </div>
    </>
  )
}

export default Login
