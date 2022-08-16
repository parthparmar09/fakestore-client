import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../UserContext";

import Spinner from "./Spinner";

export default function OneProduct() {
  const location = useLocation();
  const [product, setProduct] = useState({});
  const { addToCart, giveAlert } = useContext(UserContext);

  const renderProduct = () => {
    const id = location.pathname.split("/")[2];
    fetch(`${process.env.REACT_APP_BASE_URL}product/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
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
    renderProduct();
    // eslint-disable-next-line
  }, []);

  return (<>
      {product.title === undefined ? (
        <Spinner />
      ) : (
        <div className="container my-5 pt-5 d-flex w-75 w-sm-100 " id="single-product">
          <div className="container   flex-1 d-flex  flex-column justify-content-between ">
            <div className="image-container">
              <img
                src={product.image}
                alt="..."
                className=" mt-4"
                height="400px"
                width="400px"
              />
            </div>
          </div>
          <div className="container right flex-1  d-flex flex-column text-left mt-1 p-3">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <h3>&#8377;{product.price}</h3>
            <h5>
              Rating : {product.rating.rate}/5 from {product.rating.count}{" "}
              reviews
            </h5>

            <div className=" d-flex p-3 justify-content-evenly align-items-center">
              <label htmlFor="qty">Quantity :</label>
              <input
                type="number"
                name="qty"
                id="qty"
                min="1"
                max="5"
                defaultValue="1"
                style={{ width: "50px", height: "2rem" }}
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
          <div className=" p-3"></div>
        </div>
      )}
    </>
  );
}
