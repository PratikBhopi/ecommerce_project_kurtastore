import React, { useEffect, useState } from 'react'
import PageLayout from '../components/PageLayout'
import EditProduct from '../components/EditProduct'

const Products = () => {
    const [Items, setItems] = useState([])
    const [openPortal, setPortal] = useState(false)
    const [editingProductId, setEditingProductId] = useState(null) // New state to track the editing product

    const getProducts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/admin/getProduct`, {
                method: "GET",
                headers: {
                    token: sessionStorage.getItem('token')
                }
            })
            const data = await response.json()
            if (data.status == 200) {
                setItems(data.Products)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const handleEditClick = (productId) => {
        setEditingProductId(productId)
        setPortal(true)
    }

    return (
        <>
            <PageLayout title={'Products'}>
                <div className='w-full relative'>
                    <div className='px-3 pt-4'>
                        <h1 className='text-[20px]'>All Products:</h1>
                        <div className='w-full'>
                            {
                                Items.map(item => {
                                    return (
                                        <div className='bg-white my-2 px-3 py-2 relative' key={item._id}>
                                            <div className='my-2'>
                                                Product ID: {item.PRODUCT_id}
                                            </div>
                                            {
                                                openPortal && editingProductId === item._id ? (
                                                    <EditProduct getProducts={getProducts} setPortal={setPortal} openPortal={openPortal} item={item} />
                                                ) : null
                                            }
                                            <div onClick={() => handleEditClick(item._id)} className='text-end w-full'>
                                                Edit
                                            </div>
                                            <div className='flex gap-8 w-full'>
                                                <div>
                                                    <div className='w-[120px]'>
                                                        <img className='w-full' src={item.Product_img_url} alt="" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div>Name: <span className='text-[14px] font-[500]'> {item.Product_name} </span> </div>
                                                    <div>Description: <span className='text-[14px] font-[500]'> {item.Description} </span> </div>
                                                    <div>Actual Price: <span className='text-[14px] font-[500]'> ₹ {item.Price} </span> </div>
                                                    <div>Payable Price: <span className='text-[14px] font-[500]'>₹ {item.Discounted_Price} </span> </div>
                                                    <div>Status: <span className='text-yellow-600'>{item.Status}</span></div>
                                                </div>
                                                <div className='flex flex-wrap gap-2'>
                                                    <div>Available Colors:</div>
                                                    {item.Colors.map(col => (
                                                        <div key={col.hexcode}>
                                                            <h1 style={{ backgroundColor: col.hexcode }} className='text-white border my-1 rounded-sm px-2 text-[13px] py-1'>{col.color}</h1>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </PageLayout>
        </>
    )
}

export default Products
