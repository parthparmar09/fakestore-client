import React , {useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

export default function Product(props) {

  const {addToCart} = useContext(UserContext)
  const { id, title, image, catagory, description, rating, price } = props;
  const handleClick = (e) => {
    addToCart(id , title , image , price )
  }
  return (
    <div className="col " >
      
      <div className="card d-flex h-100 product-item justify-content-between " >
        <div className="d-flex justify-content-end ">
          <span className="badge bg-success fs-7 h-100">{Math.floor(Math.random() * 100)}% off</span>
        </div>
        <div className="container text-center">
          <Link to={`/product/${id}`}>
          <img
            className="card-img image-fluid"
            src={image}
            alt="Vans"
            style={{ objectFit: "contain", height: "200px", width: "200px" }}
          /></Link>
        </div>
        <div className="container">
          <div className="card-body d-flex flex-column justify-content-evenly ">
            <h4 className="card-title">{title}</h4>
            <h6 className="card-subtitle mb-2 text-muted">
              <s>{catagory}</s>
              {description.slice(0, 100)}...
            </h6>
            <div className="rating">
              <p className="text-left">
                <b>
                  rated <span className="text-success">{rating.rate}/5</span>{" "}
                  from <em>{rating.count}</em> ratings
                </b>
              </p>
            </div>
            <div className="buy d-flex justify-content-between  align-items-center">
              <h5 className="mt-4">
                <b>&#8377; {price}</b>
              </h5>
              <button className="btn btn-secondary mt-3" data-id = {id} onClick={
              handleClick}>
                <i className="fas fa-shopping-cart"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
