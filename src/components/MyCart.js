import React, { useContext, useState, useEffect } from "react";
import UserContext from "../UserContext";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

export default function MyCart() {
  const { cartItems, getCart } = useContext(UserContext);
  const [total, setTotal] = useState(
    Math.floor(
      cartItems
        .map((item) => item.price * item.qty)
        .reduce((prev, curr) => prev + curr, 0)
    )
  );

  useEffect(() => {
    getCart();

    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setTotal(
      Math.floor(
        cartItems
          .map((item) => item.price * item.qty)
          .reduce((prev, curr) => prev + curr, 0)
      )
    );
    // eslint-disable-next-line
  }, [cartItems]);

  return (
    <div className="container my-5 py-4">
      <h2 className="ms-3">My cart</h2>

      <div className="container d-flex row" id="mycart">
        {cartItems.length === 0 ? 
          <h6 className="text-muted">Your cart is empty</h6>
         : 
          <>
            <div className="container col col-8" id="cart-items">
              {cartItems.map((item) => {
                return <CartItem key={item.id} product={item} />;
              })}
            </div>
            <div className="container col">
              <CheckOut total={total} />
            </div>{" "}
          </>
        }
      </div>
    </div>
  );
}
