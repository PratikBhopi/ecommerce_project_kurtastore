import React, { useContext, useEffect, useState } from 'react'
import Header from '../Component/Header'
import { Link, useParams } from 'react-router-dom'
import useUIStore from '../store/useUIStore';
import useCartStore from '../store/useCartStore';
import useAuthStore from '../store/useAuthStore';
import useProductStore from '../store/useProductStore';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import SizeChart from './SizeChart'
import Cards from '../Component/Cards'
import Footer from '../Component/Footer'
import CardsContainer from '../Component/CardsContainer'
import { GoLink } from "react-icons/go";
import { Helmet } from 'react-helmet'

const BuyProduct = () => {
  const { onOpen, isOpen } = useUIStore()
  const [size, setSize] = useState(null)
  const [activeIn, setactiveIndex] = useState(null)

  const { id } = useParams()
  const getCartProduct = useCartStore((state) => state.getCartProduct);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const itemsData = useProductStore((state) => state.itemsData);

  const [ItemData, setItemdata] = useState([])
  const [subImg, setSubImg] = useState([])
  const [mainImg, setMainImg] = useState('')



  const fetchProductData = async (id) => {

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/products/` + id, {
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
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/cart`, {
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
  const copyLInk = () => {
    navigator.clipboard.writeText(shareLink)
    toast('Link Copied')
    return
  }

  return (
    <div className="bg-background text-on-background font-body-md selection:bg-secondary-container min-h-screen">
      <Header />
      <ToastContainer newestOnTop={true} autoClose={800}
        toastStyle={{ backgroundColor: "white", color: "black" }} hideProgressBar={true} />
      
      <Helmet>
        <script type="application/ld+json">
          {`
    {
      "@context": "https://karmathreads.vercel.app",
      "@type": "Product",
      "name": "${ItemData.Product_name}",
      "image": "${ItemData.Product_img_url}",
      "description": "${ItemData.Description}",
      "offers": {
        "@type": "Offer",
        "priceCurrency": "INR",
        "price": "${ItemData.Discounted_Price}",
      }
    }
  `}
        </script>
        <meta charSet="utf-8" />
        <title>Karma Threads - {`${ItemData.Product_name || 'Product'}`}</title>
      </Helmet>
      
      {isOpen && <SizeChart />}

      <main className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-8 md:py-16">
        
        {/* Breadcrumb (Optional, can be static for now) */}
        <div className="mb-8 font-label-sm uppercase tracking-widest text-outline text-xs">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-primary">{ItemData.Product_name}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          
          {/* Images Section */}
          <div className="w-full md:w-3/5 flex flex-col-reverse md:flex-row gap-4">
            
            {/* Thumbnails */}
            <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto md:max-h-[700px] scrollbar-none snap-x md:snap-y shrink-0">
              {subImg.map((child, index) => (
                <div key={index} className="w-20 md:w-24 shrink-0 snap-start gold-border overflow-hidden cursor-pointer" onClick={() => handleImageClick(index)}>
                  <img src={child.img_url} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" alt="thumbnail" />
                </div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex-1 gold-border overflow-hidden relative group">
              <img src={mainImg} className="w-full h-auto object-cover md:h-[700px] transition-transform duration-700 group-hover:scale-105" alt={ItemData.Product_name} />
            </div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-2/5 flex flex-col sticky top-24">
            
            <p className="font-label-sm uppercase tracking-[0.3em] text-outline mb-2">Heritage Collection</p>
            <h1 className="font-display-lg text-3xl md:text-5xl text-primary uppercase mb-4 tracking-tighter">
              {ItemData.Product_name}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="font-title-md text-2xl text-primary font-bold">₹ {ItemData.Discounted_Price}</span>
              <span className="font-body-md text-outline line-through">₹ {ItemData.Price}</span>
              <span className="text-[10px] text-outline-variant ml-auto uppercase tracking-widest">Tax Included</span>
            </div>

            <div className="w-full h-px bg-outline-variant/30 diamond-divider mb-8 relative"></div>

            <p className="font-body-md text-on-surface-variant leading-relaxed mb-8 italic">
              {ItemData.Description}
            </p>

            {/* Colors */}
            <div className="mb-8">
              <div className="font-label-sm uppercase tracking-widest text-primary mb-3">Color</div>
              <div className="flex gap-3">
                {subImg.map((col, index) => (
                  <button 
                    key={index}
                    onClick={() => changeImg(col)}
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 shadow-sm ${activeIn === col.hexcode ? 'border-primary scale-110' : 'border-white hover:scale-110'}`}
                    style={{ backgroundColor: col.hexcode }}
                    aria-label={`Select color ${col.hexcode}`}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-8">
              <div className="flex justify-between items-end mb-3">
                <div className="font-label-sm uppercase tracking-widest text-primary">Size</div>
                <button onClick={onOpen} className="font-label-sm text-outline hover:text-primary transition-colors underline underline-offset-4 text-xs tracking-widest uppercase">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {[{ XS: 34 }, { S: 36 }, { M: 38 }, { L: 40 }, { XL: 42 }, { XXL: 44 }].map((item) => {
                  const brandSize = Object.keys(item)[0];
                  const isSelected = size === brandSize;
                  return (
                    <button 
                      key={brandSize}
                      onClick={() => setSize(brandSize)}
                      className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 font-label-sm ${isSelected ? 'border-primary bg-primary text-white shadow-md' : 'border-outline-variant/50 hover:border-primary text-on-surface'}`}
                    >
                      {brandSize}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-10">
              <button 
                onClick={() => addtoCart(ItemData.PRODUCT_id, size, activeIn, mainImg)}
                className="flex-1 bg-primary text-white py-4 font-label-sm uppercase tracking-widest hover:bg-opacity-90 transition-all duration-300"
              >
                Add to Bag
              </button>
              <button 
                onClick={copyLInk}
                className="w-14 h-[52px] flex items-center justify-center border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 group"
                title="Share product"
              >
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">share</span>
              </button>
            </div>

            {/* Product Meta */}
            <div className="border-t border-outline-variant/30 pt-6 space-y-4">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-outline mt-0.5">local_shipping</span>
                <div>
                  <h4 className="font-label-sm uppercase tracking-widest text-primary mb-1 text-xs">Free Shipping</h4>
                  <p className="font-body-md text-on-surface-variant text-sm">On all orders within India.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-outline mt-0.5">assignment_return</span>
                <div>
                  <h4 className="font-label-sm uppercase tracking-widest text-primary mb-1 text-xs">Easy Returns</h4>
                  <p className="font-body-md text-on-surface-variant text-sm">14-day return policy on unworn items.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        <section className="mt-24 pt-16 border-t border-outline-variant/30">
          <div className="text-center mb-12">
            <h3 className="font-display-lg text-headline-lg text-primary uppercase mb-4 tracking-tighter">The Curated Archive</h3>
            <div className="w-16 h-px bg-outline-variant/50 mx-auto diamond-divider"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-gutter">
            {itemsData.slice(0, 4).map(item => (
              <Cards key={item.PRODUCT_id} productsdata={item} />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Link to="/shop" className="border-b border-primary text-primary font-label-sm uppercase tracking-widest pb-1 hover:text-secondary transition-colors">
              View Entire Collection
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default BuyProduct
