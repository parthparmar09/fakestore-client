import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function CheckOut(props) {
  const { cartItems, setCartItems, giveAlert } = useContext(UserContext);
  const navigate = useNavigate();
  const { total } = props;
  const shipping = 49;
  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `${process.env.REACT_APP_BASE_URL}order`;
    let params = {
      amount: (total + shipping) * 100,
      items: cartItems,
      address : {
        pin : document.getElementById('pin').value,
        state : document.getElementById('state').value,
        locality : document.getElementById('locality').value
      }
    };

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        if(data.success){

          displayPayment(data.order_id);
        }else{
          console.log(data)
        }
      });
  };

  const displayPayment = (o_id) => {
    var options = {
      key: process.env.REACT_APP_PAY_KEY,
      currency: "INR",
      name: "FakeStore",
      description: `#${o_id}`,
      order_id: o_id,
      handler: function (response) {
        let pay_id = response.razorpay_payment_id;
        let o_id = response.razorpay_order_id;
        let sig = response.razorpay_signature;
        verifyPaymet(o_id, pay_id, sig);
      },
      theme: {
        color: "#292b2c",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const verifyPaymet = (o_id, pay_id, sig) => {
    let url = `${process.env.REACT_APP_BASE_URL}order/confirm`;

    let params = {
      order_id: o_id,
      payment_id: pay_id,
      signature: sig,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "authorization" : `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          deleteCart()
          setCartItems([]);
          navigate("/");
          giveAlert("success", data.msg);
        }
      });
  };

  const deleteCart = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}cart/`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div
        className="container border rounded product-item"
        style={{ height: "85vh" }}
      >
        <div className="container d-flex flex-column mt-3">
          <button className={`btn btn-success ${cartItems.length===0 && 'disabled'}`} type="submit">
            Proceed to Checkout...
          </button>
          <div className="d-flex mt-3">
            <h5 className="text-muted">Items : {cartItems.length}</h5>
            <h5 className="ms-auto ">&#8377;{total} </h5>
          </div>
          <div className="d-flex mt-3">
            <h6 className="text-muted">Shipping : </h6>
            <h5 className="ms-auto">&#8377; 49</h5>
          </div>
          <hr />
          <div className="d-flex">
            <h5 className="">Total : </h5>
            <h5 className="ms-auto text-success">&#8377; {total + shipping}</h5>
          </div>
        </div>
        <hr />
        <div className="container">
          <h5>Address :</h5>
          <div className="mb-3">
            <label htmlFor="pin" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              placeholder=""
              required

            />
          </div>
          <div className="mb-3">
            <label htmlFor="pin" className="form-label">
              PIN
            </label>
            <input
              type="text"
              className="form-control"
              id="pin"
              name="pin"
              placeholder="eg : 404000"
              required
              maxLength="6"
              minLength="6"
            />
          </div>
          <div className="">
            <label htmlFor="address" className="form-label">
              Locality
            </label>
            <textarea
              className="form-control"
              id="locality"
              rows="3"
              placeholder="eg : street , landmark , city"
            ></textarea>
          </div>
       
        </div>
      </div>
    </form>
  );
}
