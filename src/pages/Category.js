import React, { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import Album from "../components/Album";
import { useLocation } from "react-router-dom";

export default function Category() {

  const location = useLocation();
  const [catProducts, setCatProducts] = useState([]);




  const { setLoading, setTitle, giveAlert } = useContext(UserContext);

  const getProducts = () => {

    const category = location.pathname.split("/")[2];
    
    setLoading(true);
    let url = ''
    if(category==='all'){
      url = `${process.env.REACT_APP_BASE_URL}product/`;
      setTitle(`Top Products`);

    }else{
      url = `${process.env.REACT_APP_BASE_URL}product/category/${category}`;
      setTitle(`Everything in ${category.split("%20").join(" ")}`);
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLoading(false);
          setCatProducts(data.products);
        } else {
          giveAlert("danger", data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, [location]);


  return (
    <>
      <Album products={catProducts} />
    </>
  );
}
