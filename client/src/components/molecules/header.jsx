import React from "react"
import logo from "../../assets/logo.svg"
import cartLogo from "../../assets/cart.svg"
import { Login, Register } from "./modal"
import Dropdown from "./dropdown"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { UserContext } from "../context/userContext"
import { useQuery } from 'react-query';
import { API } from '../config/api';

const photo = "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"

export default function Header() {

  const navigate = useNavigate()
  const [state, dispatch] = React.useContext(UserContext)
  
  const [modalLogin, setModalLogin] = React.useState(false)
  const [modalRegister, setModalRegister] = React.useState(false)
  const [userDropdown, setUserDropdown] = React.useState(false)
  const [adminDropdown, setAdminDropdown] = React.useState(false)

  function switchModal() {
    if (modalLogin) {
      setModalLogin(false)
      setModalRegister(true)
    } else {
      setModalRegister(false)
      setModalLogin(true)
    }
  }

  function logOut() {
    setUserDropdown(false)
    setAdminDropdown(false)
    dispatch({ type: 'LOGOUT' })
  }

  const { data: cart } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts");
    return response.data.data;
  });
  
  return (
    <header className="fixed z-index-2 w100">
      <nav className="py2 px6 flex jc-between ai-center bg-white">
        <motion.img className="logo round cursor-pointer"
         whileHover={{ rotate: 90 }} whileTap={{ rotate: 360, scale: 0.9 }}
         src={logo} alt="logo"
         onClick={ () => navigate("/") }
        />

        { state.isLogin ?
        <div className="flex ai-center">
          { state.user.status === "customer" &&
          <div className="cart relative cursor-pointer">
            <img src={cartLogo} alt="cart" onClick={()=>navigate("/cart")} />
            { (cart?.length >= 1) && <span>{cart?.length}</span> }
          </div>
          }
         <img className="pp cursor-pointer" src={photo} alt="user"
           onClick={() =>
            (state.user.status === "admin") ? setAdminDropdown(!adminDropdown) : setUserDropdown(!userDropdown)
           }
          />
        </div>
        :
        <div className="grid col-2 col-gap-1 w15rem">
          <motion.button className="py0-1 bg-none br5 br-red txt-red bold"
           whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
           onClick={ () => setModalLogin(true) }
          >Login</motion.button>

          <motion.button className="py0-1 bg-red br5 br-red txt-white fw500"
           whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
           onClick={ () => setModalRegister(true) }
          >Register</motion.button>
        </div>
        }
      </nav>

      <Login
      modalLogin={modalLogin}
      setModalLogin={setModalLogin}
      switchModal={switchModal}
      />

      <Register
      modalRegister={modalRegister}
      setModalRegister={setModalRegister}
      switchModal={switchModal}
      />

      <Dropdown
      adminDropdown={adminDropdown}
      userDropdown={userDropdown}
      logOut={logOut}
      />
    </header>
  )
}
