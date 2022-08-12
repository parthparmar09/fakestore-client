import React,{useContext} from "react";
import UserContext from "../UserContext";

export default function CheckOut(props) {
  const { cartItems } = useContext(UserContext)
  const {total} = props
    const shipping = 49
   

   const handleClick = (e) => {
    e.preventDefault()
    fetch(`${process.env.REACT_APP_BASE_URL}paynow` ,{
      method : "POST",
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        "amount" : "1212",
        "id" : "123123",
        "email" : "email@e.com",
        "phone" : "9090909090"
      }),
    }).then(res => res.json()).then(data => console.log(data)).catch(err => console.log(err))
   }

  return (
    <form action="" onSubmit={handleClick}>
    <div className="container border rounded product-item" style={{height : '85vh'}}>
      <div className="container d-flex flex-column mt-3">
        <button className="btn btn-success" type="submit">Proceed to Checkout...</button>
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
            maxLength='10'
            minLength='10'
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
            maxLength='6'
            minLength='6'
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
