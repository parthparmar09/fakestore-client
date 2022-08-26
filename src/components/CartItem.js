import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

export default function CartItem(props) {
  const { addToCart, giveAlert, cartItems, setCartItems } =
    useContext(UserContext);

  const { id, title, price, image, qty } = props.product;

  const [quantity, setQuantity] = useState(qty);

  const handleRemove = () => {
    let temp = cartItems.filter((item) => item.id !== id);
    setCartItems(temp);
    giveAlert('success' , 'item removed')

    fetch(`${process.env.REACT_APP_BASE_URL}cart/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          return giveAlert("danger", data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const qtyMinus = () => {
    if(quantity === 1){
      return null
    }
    setQuantity(quantity - 1);
    addToCart(id, title, image, price, quantity - 1);
  };
  const qtyPlus = () => {
    setQuantity(quantity + 1);
    addToCart(id, title, image, price, quantity + 1);
  };

  return (
    <div className="d-flex my-2 product-item rounded w-100 row">
      <div className="p-1 col-3">
        <img className="image-fluid cart-image" src={image} alt="" />
      </div>
      <div className=" d-flex flex-column my-3 col-6">
        <h4 className="">&#8377; {price}</h4>
        <h5 className="text-muted">{title.slice(0, 25)}...</h5>
        <div className="mt-auto">
          <Link className="link-secondary " to="" onClick={handleRemove}>
            remove
          </Link>
          <Link className="link-success ms-3" to={`/product/${id}`}>
            view
          </Link>
        </div>
      </div>
      <div className="my-auto col-3 ">
        <div className="d-flex align-items-center ">
          <button className="btn px-1 fs-3"  onClick={qtyMinus}>
            -
          </button>
          <h4
            className="mx-2"
          >
            {quantity}
          </h4>
          <button className="btn px-1 fs-3" onClick={qtyPlus}>
            +
          </button>
        </div>
        <h3 className="text-muted">&#8377; {price * quantity}</h3>
      </div>
    </div>
  );
}
