import React, { useContext} from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../UserContext";
import Filter from "./Filter";
import Product from "./Product";
import Spinner from "./Spinner";



export default function Album(props) {
const {products} =  props

  const { title, loading } = useContext(UserContext);
  const location = useLocation()

  return (
    <div className={location.pathname !== '/' ? 'my-5 py-3' : ''}>
      {!loading ? (
        <>
          <div className="album bg-light mx-auto">
            <div className="container">
              <h2 className="text-center py-3 ">{title}</h2>

              <div className="row  row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-3">
                {products.map((product) => {
                  return (
                    <Product
                      key={product.id}
                      title={product.title}
                      catagory={product.catagory}
                      price={product.price}
                      rating={product.rating}
                      description={product.description}
                      image={product.image}
                      id={product.id}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <Filter/>{" "}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
