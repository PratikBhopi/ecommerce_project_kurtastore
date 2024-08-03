import React, { useContext, useEffect, useState } from 'react'
import Header from '../Component/Header'
import { Link, useParams } from 'react-router-dom'
import { UserContextApi } from '../context/UserContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SizeChart from './SizeChart'
import Cards from '../Component/Cards'
import Footer from '../Component/Footer'
import CardsContainer from '../Component/CardsContainer'
import { GoLink } from "react-icons/go";

const BuyProduct = () => {
  const { onOpen, isOpen } = useContext(UserContextApi)
  const [size, setSize] = useState(null)
  const [activeIn, setactiveIndex] = useState(null)

  const { id } = useParams()
  const { getCartProduct, isLoggedIn, itemsData } = useContext(UserContextApi)

  const [ItemData, setItemdata] = useState([])
  const [subImg, setSubImg] = useState([])
  const [mainImg, setMainImg] = useState('')

  

  const fetchProductData = async (id) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/fetchProducttoBuy/` + id, {
        method: 'GET',
        headers: {
          'Content-type': 'Application/json',
          token: localStorage.getItem('token')
        }
      })
      const data = await response.json()

      if (data.status == 200) {
        setItemdata(data.product)
        setSubImg(data.product.Colors)
        setMainImg(data.product.Product_img_url)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const addtoCart = async (productid, size, activeIn, productimg) => {
    if (!isLoggedIn) return toast('Kindly Login')
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/addtoCart`, {
        method: 'POST',
        headers: {
          'Content-type': 'Application/json',
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({ productid, size, activeIn, productimg })
      })
      const data = await response.json()
      if (data.status == 200) getCartProduct()
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageClick = (index) => {
    const newMainImage = subImg[index].img_url;
    const newSubImages = [...subImg];
    newSubImages[index] = ItemData.Product_img_url;

    setItemdata((prevProduct) => ({
      ...prevProduct,
      Product_img_url: newMainImage,
      Product_Sub_Img: newSubImages,
    }));

    setMainImg(ItemData.Product_img_url)
  };

  const changeImg = (col) => {

    setMainImg(col.img_url)
    setactiveIndex(col.hexcode)
  }

  useEffect(() => {
    fetchProductData(id)
  }, [id])

  const shareLink = `https://aawarastore.in/buyproduct/${id}`
  const copyLInk = ()=>{
    navigator.clipboard.writeText(shareLink)
    toast('Link Copied')
    return
  }

  return (
    <>
      <div className='w-screen fixed z-[990]'><Header /></div>

      <ToastContainer newestOnTop={true} autoClose={800}
          toastStyle={{ backgroundColor: "white", color: "black" }} hideProgressBar={true}/>
      <div className='w-screen relative min-h-screen  overflow-hidden'>
        {
          isOpen && <SizeChart />
        }
        <div className='w-screen bg-red-400 h-[50px] lg:h-[74px]'></div>
        <div className='w-full px-3 py-8'>    </div>
        <div className='w-screen ss:px-10  px-2  flex justify-start md:flex-row flex-col  items-start'>
          <div className='flex  md:w-fit w-screen md:flex-row pl-0   md:pl-5 '>
            <div className='mr-2 md:h-[48vw]  h-[380px] overflow-y-scroll scrollbar scrollbar-none'>
              {
                subImg.map((child, index) => {

                  return <div key={index} className='mb-2 md:w-[120px] w-[60px]'><img src={child.img_url} onClick={() => handleImageClick(index)} className='w-full cursor-pointer  ' alt="" /></div>

                })
              }
              {
                subImg
                  ?
                  <div className='md:w-[120px] w-[60px] border cursor-pointer md:h-[180px] h-[90px] flex-col bg-stone-300 flex justify-center text-[12px] items-center  ' >
                    <div>Shop</div>
                    <div>More</div>
                  </div>
                  :
                  ''
              }

            </div>
            <div className=''>
              <div className='md:h-[48vw] h-[380px] overflow-hidden' ><img src={mainImg} className='h-full' alt="" /></div>
            </div>
          </div>



          <div className='md:pl-[70px] px-2 md:my-0 mt-10  ss:w-fit w-full ss:text-left   text-stone-900'>

            <div className='md:text-[28px] text-[22px] tracking-[1px] md:tracking-[4px] font-[600] uppercase'> {ItemData.Product_name}</div>
            <div className='ss:text-[20px] text-[15px]  tracking-[1px] mb-2'>{ItemData.Description}</div>

            <div className='text-[24px]  tracking-[2px] font-[700]'> { '₹' + ItemData.Discounted_Price}  <span className='text-[14px] tracking-[0] opacity-[0.6] font-[400] my-2 '>MRP Inclusive Of all Taxes</span> </div>
            <div className='text-[18px] font-[500] opacity-[0.7] '><span className='line-through'>{'₹' + ItemData.Price}</span></div>
           
            <div className='h-[1px] w-full  bg-stone-300 mb-3 mt-4'></div>
            <div className='flex w-full'>
              <div className='my-2 '>
                {/* colors */}
                {
                subImg.map((col,index)=>{

                  return <div onClick={()=>changeImg(col)} key={index} style={{backgroundColor:`${col.hexcode}`,outline:activeIn == col.hexcode ? '2px solid #040304eb': 'none'}} className="px-[14px] py-1 inline mx-1 border-2 border-white rounded-full"></div>
                })
              }
              </div>
            </div>

            <div className='uppercase tracking-[2px] text-[20px] '>Size</div>
            <div className='flex gap-2 my-3'>
              {
                [{ XS: 34 }, { S: 36 }, { M: 38 }, { L: 40 }, { XL: 42 }, { XXL: 44 }].map((item, index) => {
                  const brandSize = Object.keys(item)[0]; // Get the key from the object
                  const value = item[brandSize]; // Get the value from the object
                  return (
                    <div onClick={() => setSize(brandSize)} key={value} style={{ backgroundColor: size == brandSize ? 'rgb(78 78 78 / 48%)' : 'white' }} className='py-2 hover:border-[#1D0100]  w-12 cursor-pointer text-center border border-stone-300 ss:text-[15px] text-[12px]  text-stone-700 uppercase'>{brandSize}</div>
                  );
                })
              }
            </div>
            <div className='cursor-pointer' onClick={onOpen}>Size Chart</div>
            <div className='h-5'></div>
            <div  className='w-full flex justify-between flex-row-reverse'>
            <div onClick={()=>copyLInk()} className='w-[18%] flex justify-center items-center border'><GoLink className='scale-[1.3]' /></div>
            <div onClick={() => addtoCart(ItemData.PRODUCT_id, size, activeIn, mainImg)} className='cursor-pointer w-[80%] md:py-3 py-3 tracking-[5px] md:text-[20px] text-center bg-[#040303eb] text-white'>Add To Cart</div>
            </div>
          </div>


        </div>

        <div className='w-full pt-20 ss:px-[62px]'>
          <h1 className='text-[20px] font-[500] my-4 pl-6'>Find Some more for you!</h1>
          <div className='w-full flex ss:gap-2 flex-wrap ss:justify-evenly justify-evenly gap-3 '>
            {
              itemsData.slice(0, 20).map(item => {
                return <Cards key={item.PRODUCT_id} productsdata={item} />
              })
            }
            {
              itemsData.length % 2 != 0
                ?
                <CardsContainer />
                :
                ""
            }

          </div>
        </div>
        <div className='flex justify-center mt-10 w-full'><Link to={'/shop'} className='hover:bg-gradient-to-r from-[#1b1b1b] to-black hover:text-white'> <div className='px-5 py-1 border '>Shop More</div></Link></div>
      </div>
      <div className='mt-10'>
        <Footer />

      </div>
    </>
  )
}

export default BuyProduct
