import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function CheckOut(props) {
  const { cartItems, setCartItems ,giveAlert} = useContext(UserContext);
  const navigate = useNavigate()
  const { total } = props;
  const shipping = 49;
  const handleSubmit = (e) => {
    e.preventDefault();
    var url = `${process.env.REACT_APP_BASE_URL}payment/order`;
    var params = {
      amount: (total+shipping) * 100,
      currency: "INR",
      receipt: `${Date.now()}`,
      payment_capture: "1",
    };

    fetch(url , {
      method : 'POST' , 
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(params)
    }).then(res => res.json()).then(data => {
      console.log(data)
      displayPayment(data.sub.id )

    })
  };

  const displayPayment = (o_id ) => {
    var options = {
      key: "rzp_test_0sodoJkEKmj7Ib",
      currency: "INR",
      name: "FakeStore",
      description: `#${o_id}`,
      order_id: o_id,
      handler: function (response) {
        let pay_id =
          response.razorpay_payment_id;
        let o_id = response.razorpay_order_id;
        let sig = response.razorpay_signature;
        verifyPaymet(o_id,pay_id,sig)
      },
      theme: {
        color: "#292b2c",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }

  const verifyPaymet = (o_id,pay_id,sig) => {
    var nurl = `${process.env.REACT_APP_BASE_URL}payment/verify`;

    var params2 = {
        razorpay_order_id: o_id,
        razorpay_payment_id: pay_id,
        razorpay_signature: sig
    };
  
    fetch(nurl , {
      method : 'POST' , 
      headers : {
        'content-type' : 'application/json'
      },
      body : JSON.stringify(params2)
    }).then(res => res.json()).then(data => {
      if(data.status === 'success'){
        deleteCart()
        setCartItems([])
        navigate('/')
        giveAlert('success' , 'order placed successfully')

      }
    })
  }
  

  const deleteCart = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}cart/` , {
      method : "DELETE" ,
      headers : {
        'authorization' : `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  return (
    <form action="" onSubmit={handleSubmit}>
      <div
        className="container border rounded product-item"
        style={{ height: "85vh" }}
      >
        <div className="container d-flex flex-column mt-3">
          <button className="btn btn-success" type="submit">
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
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="mobile number"
              name="phone"
              required
              maxLength="10"
              minLength="10"
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
              Address
            </label>
            <textarea
              className="form-control"
              id="address"
              rows="3"
              placeholder=" street , locality , city , state"
            ></textarea>
          </div>
        </div>
      </div>
    </form>
  );
}
