import React from 'react'
import PageLayout from '../components/PageLayout'

const AdminPage = () => {
  return (
    <>
    <PageLayout title="admin">
      <div className='w-full'>
        <div className='px-4 w-full '>

          <h1>This is the admin page!!</h1>
          <div>You can add prdoucts!</div>
          <div>You can edit prdoucts!</div>
          <div>You can delete prdoucts!</div>
          <div>You will recive order here!</div>
          <div>You will change the stauts of order here!</div>
          <div>!</div>
        </div>
      </div>
    </PageLayout>
    </>
  )
}

export default AdminPage
