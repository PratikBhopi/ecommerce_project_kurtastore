import React from 'react'

import '../src/App.css'
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AboutUs from './Pages/AboutUs';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import BuyProduct from './Pages/BuyProduct';
import Checkout from './Pages/Checkout';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import ShippinPolicy from './Pages/ShippinPolicy';
import ExchangePolicy from './Pages/ExchangePolicy';
import Cancelation from './Pages/Cancelation';
import TermsCondition from './Pages/TermsCondition';
import SuccessfulOrder from './Pages/SuccessfulOrder';
import Orders from './Pages/Orders';
import ForgetPassword from './Component/ForgetPassword';
import ErrorPage from './Pages/Error';

const router = createBrowserRouter([
  {
    path:'*',
    element:<ErrorPage />
  },
  {
    path:'/',
    element:<Home />
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:'/register',
    element:<Register />
  },
  {
    path:'/home',
    element:<Home />
  },
 
  {
    path:'/aboutus',
    element:<AboutUs />
  },
  {
    path:'/shop',
    element:<Shop />
  },
  {
    path:'/cart',
    element:<Cart />
  },
  {
    path:'/buyproduct/:id',
    element:<BuyProduct />
  },
  {
    path:'/cart/checkout',
    element:<Checkout />
  },
  {
    path:'/privacypolicy',
    element:<PrivacyPolicy />
  },
  {
    path:'/shippingpolicy',
    element:<ShippinPolicy />
  },
  {
    path:'/exchangepolicy',
    element:<ExchangePolicy />
  },
  {
    path:'/cancelationpolicy',
    element:<Cancelation />
  },
  {
    path:'/termsandcondition',
    element:<TermsCondition />
  },
  {
    path:'/user/successful-order',
    element:<SuccessfulOrder />
  },
  {
    path:'/myorders',
    element:<Orders />
  },
  {
    path:'/login/forget-password',
    element:<ForgetPassword />
  }
])

const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
