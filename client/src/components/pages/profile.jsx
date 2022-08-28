import logo from "../../assets/logo.svg";
import Header from "../molecules/header";
import { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [state] = useContext(UserContext)
  const navigate = useNavigate()

  let { data: cart } = useQuery("cartsCache", async () => {
    const response = await API.get("/carts");
    return response.data.data;
  });

  // subtotal
  let resultTotal = cart?.reduce((a, b) => {
    return a + b.sub_amount;
  }, 0);

  const { data: profile } = useQuery('profilesCache', async () => {
    const id = state.user.id
    const res = await API.get(`/profile/${id}`)
    return res.data.data
  })

  useEffect(() => {
    console.log(profile);
  }, [profile])

  let { data: transaction_profile } = useQuery('transactionsCache', async () => {
    const response = await API.get('/transaction-id');
    console.log(response)  
    return response.data.data;
  });

  console.log("transaction_profile" + transaction_profile)
  


  return (
    <>
    <Header />
    <div className="transaction-section after-nav">
      <div className="profile-container">
        <div className="profile-title">
          <h6>My Profile</h6>
        </div>
        <div className="detail-profile">
            <div className="picture-profile">
            <img
              className="picture-user"
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt=""
              />
          </div>
          <div className="identity-profile">
            <div className="identity-name">
              <h6>Full Name</h6>
            </div>
            <div className="userName">
              <h6>{ state.user.name }</h6>
            </div>
            <div className="identity-email">
              <h6>Email</h6>
            </div>
            <div className="userEmail">
              <h6>{ state.user.email }</h6>
            </div>
          </div>
          <button className="bg-red br-none br5 txt-white" style={{width: "135px"}}
          onClick={ () => navigate('/update-profile')}
          >
            change profile
          </button>
        </div>
      </div>
      <div className="transaction-container">
        <div className="transaction-title">
          <h6>My Transaction</h6>
        </div>
        <div className="detail-transaction">
          <div className="left-container">
          {transaction_profile?.cart.map((item, index) => (
            <div className="main-order">
              <div className="picture-menu">
                <img
                  className="picture-menuPurchased"
                  src={
                    "http://localhost:2500/uploads/" + item?.product?.image
                  }
                  alt=""
                />
              </div>
              <div className="data-order">
                <div className="data-flavour">
                  <h6> {item?.product?.title}</h6>
                </div>
                <div className="orderTime">
                  <h6>Saturday, 3-Juli-2022</h6>
                </div>
                <div className="data-topping">
                  <h6>Topping :
                          {item?.topping.map((topping, idx) => (
                            <div key={idx} style={{display:"inline"}}>{topping?.title} ,</div>
                          ))}</h6>
                </div>
                <div className="data-price">
                  <h6>{cart?.sub_amount}</h6>
                </div>
              </div>
            </div>
            ))}
          </div>
          <div className="right-container">
            <div className="logo-transaction">
              <img className="logo-detail" src={logo} alt="logo" />
            </div>
            <div className="qr-transaction">
              <img
                className="qr-code"
                src="https://i.stack.imgur.com/XHWnX.png"
                alt=""
              />
            </div>
            <div className="status-order">
              <h6>{
                  transaction_profile?.status === "Success" ? "Success" : transaction_profile?.status === "Cancel"?
                  "Canceled": transaction_profile?.status === "pending"? "Pending" : "On The Way"
                }</h6>
            </div>
            <div className="subTotal">
              <h6>Sub Total : {resultTotal}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Profile;
