import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../UserContext";

import Spinner from "../components/Spinner";

export default function OneProduct() {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const { addToCart, giveAlert } = useContext(UserContext);

  const getProduct = () => {
    const id = location.pathname.split("/")[2];
    fetch(`${process.env.REACT_APP_BASE_URL}product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProduct(data.product);
        } else {
          giveAlert("danger", data.msg);
        }
      });
  };
  const addCart = (e) => {
    const qty = document.getElementById("qty").value;
    addToCart(product.id, product.title, product.image, product.price, qty);
  };
  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="my-5 pt-5 d-flex w-75 mx-auto" id="single-product">
      {product.title === undefined ? (
        <Spinner />
      ) : (
        <>
          <div className="image-container">
            <img
              src={product.image}
              alt="..."
              className=" mt-4"
              height="350px"
              width="350px"
            />
          </div>

          <div className="container d-flex flex-column text-left pt-3 m-3">
            <div>
              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <h3>&#8377;{product.price}</h3>
              <h5>
                Rating : {product.rating.rate}/5 from {product.rating.count}{" "}
                reviews
              </h5>
            </div>

            <div className=" d-flex justify-content-start align-items-center">
              <label htmlFor="qty" className="me-1">
                Quantity :
              </label>
              <input
                type="number"
                name="qty"
                id="qty"
                min="1"
                max="5"
                defaultValue="1"
                style={{ width: "50px", height: "2rem", borderRadius: "5px" }}
              />
              <button
                className="btn btn-secondary mx-2"
                data-id={product.id}
                onClick={addCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
