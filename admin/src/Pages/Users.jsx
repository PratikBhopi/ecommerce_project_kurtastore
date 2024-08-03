import React, { useEffect, useState } from 'react'
import PageLayout from '../components/PageLayout'

const Users = () => {
    const [allusers,setAllUsers] = useState([])

    const getUsers = async ()=>{
        
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/getusers`,{
                method:'GET',
                headers:{
                    token:sessionStorage.getItem('token')
                }
            })
            const data = await response.json()
            if(data.status == 200){
                setAllUsers(data.Users)
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        getUsers()
    },[])


  return (
    <>
    <PageLayout title="User's Details">
        <div className='w-full'>
            <div className='px-3 pt-3'>
                <div>Users:</div>
                <div  className='w-full'>
                    {
                        allusers.map(user=>{
                            return <div key={user.email} className='w-full px-4 py-3 shadow-sm my-2 bg-white'>
                                <div className=''>{user.First_Name} {user.Last_Name}</div>
                                <div>Contact Mail: <span>{user.email}</span></div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </PageLayout>
      
    </>
  )
}

export default Users
