import React from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/home"
import { AddProduct } from "./pages/product"
import { AddToping } from "./pages/toping"
import Income from "./pages/transaction"
import Cart from "./pages/cart"
import Profile from "./pages/profile"
import DetailProduct from "./pages/detail-product"
import { UserContext } from "../components/context/userContext"
import { API, setAuthToken } from './config/api'
import UpdateProduct from "./pages/update-product"
import ProductsList from "./pages/products-list"
import UpdateTopping from "./pages/update-topping"
import ToppingsList from "./pages/toppings-list"
import ProfileUpdate from "./pages/profile-update"

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

export default function App() {
  const navigate = useNavigate()
  const [state, dispatch] = React.useContext(UserContext)
  
  React.useEffect(() => {
    if (state.isLogin === false) {
      navigate('/')
    } else {
      if (state.user.status === "admin") {
        navigate('/income')
      } else {
        navigate('/')
      }
    }
  }, [state])

  const checkUser = async () => {
    try {
      const res = await API.get('/check-auth')
      
      if (res.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR'
        })
      }

      let payload = res.data.data
      payload.token = localStorage.token

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      })
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    checkUser()
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add-product' element={<AddProduct />} />
      <Route path='/add-toping' element={<AddToping />} />
      <Route path='/income' element={<Income />} />
      <Route path='/cart' element={<Cart />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/update-profile' element={<ProfileUpdate />}/>
      <Route path='/detail-product/:id' element={<DetailProduct />}/>
      <Route path='/products-list' element={<ProductsList />}/>
      <Route path='/update-product/:id' element={<UpdateProduct/>}/>
      <Route path='/toppings-list' element={<ToppingsList />}/>
      <Route path='/update-topping/:id' element={<UpdateTopping/>}/>
    </Routes>
  )
}
