import { createContext, useEffect, useState } from "react";
// require('dotenv').config()

export const UserContextApi = createContext()

export const UserContextProvider = ({ children }) => {

  const [isAllowedToCheckout, setIsAllowedToCheckout] = useState(false);



    const [isLoggedIn, setLoggedIn] = useState(false)

    const checkUser = async () => {
        const token = localStorage.getItem('token')
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/authorization`, {
                method: 'POST',
                headers: {
                    token: localStorage.getItem('token')
                }

            })
            const data = await response.json()
            // console.log(data)
            if (data.status == 200) setLoggedIn(true)
        } catch (error) {
            setLoggedIn(false)
        }

    }

    const [itemsData, setItemsData] = useState([])

    const getPosts = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getProducts`)
            const data = await response.json()
            // console.log(data)
            setItemsData(data.products)

        } catch (error) {
            console.log(error)
        }
    }



    const [isOpen, setAddPortal] = useState(false)
    const onOpen = () => {
        setAddPortal(true)
    }
    const onClose = () => {
        setAddPortal(false)
    }

    const [totalCartItems, setTotalCartItems] = useState(0)

    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);
  
    const getCartProduct = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/getCartProduct`, {
          method: 'GET',
          headers: {
            'Content-type': 'Application/json',
            token: localStorage.getItem('token')
          },
        });
        const data = await response.json();
        if (data.status === 200) {
          setCartItems(data.cartProducts.Products);
          setCartTotalPrice(data.cartProducts.Total_Price);
          setTotalCartItems(data.cartProducts.Total_Quantity)

        } else if (data.status === 204) {
          setCartItems([]);
          setCartTotalPrice(0);
        }
      } catch (error) {
        console.error('Failed to fetch cart products:', error);
        
      }
    };





    useEffect(() => {
        getPosts()
        checkUser()
        // getCartLength()
        getCartProduct()
    }, [isLoggedIn])





    return (
        <UserContextApi.Provider value={{ isAllowedToCheckout, setIsAllowedToCheckout,setLoggedIn, isLoggedIn, checkUser, setItemsData,itemsData, totalCartItems ,isOpen,onOpen,onClose,cartItems,getCartProduct,cartTotalPrice}}>
            {children}
        </UserContextApi.Provider>
    )
}
