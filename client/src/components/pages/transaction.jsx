import Header from "../molecules/header"
import React from "react"
import logo from "../../assets/logo.svg";
import transactionData from "../molecules/transaction-data";

export default function Income() {
    const [transactionPopUp, setTransactionPopUp] = React.useState(false);
  

    
  return (
    <>
    <Header />
    <main className="after-nav pb5">
        <section className="pt4 mx5">
            <h1 className="txt-red mb2-5">Income Transaction</h1>
            <table>
                <thead className="bg-gray">
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Post Code</th>
                        <th>Income</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {transactionData.map((data, index)=>(               
                    <tr>
                        <td>{data.no}</td>
                        <td>{data.name}</td>
                        <td>{data.address}</td>
                        <td>{data.postCode}</td>
                        <td>Rp {data.income}</td>
                        <td onClick={()=>setTransactionPopUp(true)}>{data.status}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </section>
    </main>
    {transactionPopUp && 
      <section className="modal fixed z-index-3 w100 h100 flex jc-center ai-center"
      onClick={ () => setTransactionPopUp(false) }
      >
    <div className="detail-transaction">
          <div className="left-container">
            <div className="main-order">
              <div className="picture-menu">
                <img
                  className="picture-menuPurchased"
                  src="https://www.pngitem.com/pimgs/m/129-1296068_caramel-macchiato-vanilla-bean-macchiato-starbucks-hd-png.png"
                  alt=""
                />
              </div>
              <div className="data-order">
                <div className="data-flavour">
                  <h6>Ice Coffee Palm Sugar</h6>
                </div>
                <div className="orderTime">
                  <h6>Saturday, 3-Juli-2022</h6>
                </div>
                <div className="data-topping">
                  <h6>Topping: Berry Boba, Bubble Tea Gelatin</h6>
                </div>
                <div className="data-price">
                  <h6>Price : Rp 33.000</h6>
                </div>
              </div>
            </div>
            <div className="main-order">
              <div className="picture-menu">
                <img
                  className="picture-menuPurchased"
                  src="https://www.pngitem.com/pimgs/m/129-1296068_caramel-macchiato-vanilla-bean-macchiato-starbucks-hd-png.png"
                  alt=""
                />
              </div>
              <div className="data-order">
                <div className="data-flavour">
                  <h6>Ice Coffee Palm Sugar</h6>
                </div>
                <div className="orderTime">
                  <h6>Saturday, 3-Juli-2022</h6>
                </div>
                <div className="data-topping">
                  <h6>Topping: Berry Boba, Bubble Tea Gelatin</h6>
                </div>
                <div className="data-price">
                  <h6>Price : Rp 33.000</h6>
                </div>
              </div>
            </div>
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
              <h6>On the way</h6>
            </div>
            <div className="subTotal">
              <h6>Sub Total : Rp 69.000</h6>
            </div>
          </div>
        </div>
      </section>
    }
    </>
  )
}
