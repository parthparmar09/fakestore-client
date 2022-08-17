import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Alert from "./components/Alert";
import Category from "./pages/Category";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyCart from "./pages/MyCart";
import Navbar from "./components/Navbar";
import OneProduct from "./pages/OneProduct";
import Account from "./pages/Account";
import Signup from "./pages/Signup";
import UserContext from "./UserContext";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Top products");
  const [alert, setAlert] = useState({});
  const [cartItems, setCartItems] = useState([]);

  let navigate = useNavigate();

  const signUp = (name, email, password, cpassword, otp) => {
    if (!email || !password || !cpassword || !otp) {
      return giveAlert("warning", "all fields are required");
    }

    if (password !== cpassword) {
      return giveAlert("warning", "passwords doesn't match");
    }

    let url = "";
    if (name === "") {
      url = `${process.env.REACT_APP_BASE_URL}user/changePass`;
    } else {
      url = `${process.env.REACT_APP_BASE_URL}user/register`;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        otp: otp,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          giveAlert("success", data.msg);
          navigate("/login");
        } else {
          giveAlert("danger", data.msg);
        }
      });
  };

  const getOtp = (email) => {
    fetch(`${process.env.REACT_APP_BASE_URL}user/authentication`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          giveAlert("success", data.msg);
        } else {
          giveAlert("danger", data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const getCart = () => {
    if(!localStorage.getItem('token')){
      return null
    }
    fetch(`${process.env.REACT_APP_BASE_URL}cart/`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCartItems(data.cart.items);
        }
      })
      .catch((err) => console.log(err));
  };

  const addToCart = (id, title, image, price, qty = 1) => {
    if(!localStorage.getItem('token')){
      return giveAlert('warning' , 'login/signup to add')
    }
    fetch(`${process.env.REACT_APP_BASE_URL}cart/`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        item: {
          id: id,
          qty: qty,
          title: title,
          price: price,
          image: image,
        },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          return giveAlert("danger", data.msg);
        }
        giveAlert("success", data.msg);
        getCart();
      })
      .catch((err) => console.log(err));
  };

  const giveAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => {
      setAlert({});
    }, 1500);
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <UserContext.Provider
        value={{
          products,
          setProducts,
          title,
          setTitle,

          alert,
          giveAlert,
          addToCart,
          loading,
          setLoading,
          getOtp,
          signUp,

          cartItems,
          getCart,
          setCartItems,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          \
          <Route path="/login" exact element={<Login />} />
          <Route path="/account" exact element={<Account />} />
          <Route path="/category/:cagerory" exact element={<Category />} />
          <Route path="/product/:id" exact element={<OneProduct />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/mycart" exact element={<MyCart />} />
        </Routes>
        {alert && <Alert />}
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
