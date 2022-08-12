import { useState} from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";

import Alert from "./components/Alert";
import Category from "./components/Category";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Login from "./components/Login";
import MyCart from "./components/MyCart";
import Navbar from "./components/Navbar";
import OneProduct from "./components/OneProduct";
import Account from "./components/Account";
import Signup from "./components/Signup";
import UserContext from "./UserContext";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Top products");
  const [alert, setAlert] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [sort , setSort] = useState('def')





  let navigate = useNavigate();



  const signUp = (name, email, password, cpassword, otp) => {
    let url = "";
    if (password !== cpassword) {
      return giveAlert("warning", "passwords doesn't match");
    }

    if (name === "") {
      url = "http://localhost:5000/user/changePass";
    } else {
      url = "http://localhost:5000/user/register";
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
    fetch("http://localhost:5000/user/authentication", {
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
    fetch(`${process.env.REACT_APP_BASE_URL}cart/` , {
      method : "GET" , 
      headers : {
        "authorization" : `Bearer ${localStorage.getItem('token')}`,

      }
    }).then(res => res.json()).then(data => {
      if(data.success){
      
        setCartItems(data.cart.items)
      
      }
    }).catch(err => console.log(err))
  }


  const addToCart = (id ,  title , image ,  price , qty=1 ) => {
    fetch(`${process.env.REACT_APP_BASE_URL}cart/` , {
      method : "PATCH" , 
      headers : {
        "authorization" : `Bearer ${localStorage.getItem('token')}`,
        "content-type": "application/json",
      },
      body :JSON.stringify( {
        "item" : {
          "id" : id , 
          "qty" : qty,
          "title" : title,
          "price" : price,
          "image" : image,
      }
      })
    }).then(res => res.json()).then(data => {
      if(!data.success){
        return giveAlert('danger' ,  data.msg)
      }
      giveAlert('success' , data.msg)
      getCart()
    }).catch(err => console.log(err))
  }


  const giveAlert = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => {
      setAlert({});
    }, 1500);
  };

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

          sort,
          setSort
        }}
      >
        <Navbar />
        <Routes>
          <Route
            path="/"
            exact
            element={
              localStorage.getItem("token") ? (
                <Home />
              ) : (
                <div className="container my-5 py-5">
                  <h3 className="my5">
                    <Link to="/login">Login</Link> or{" "}
                    <Link to="/signup">Sign Up</Link> to continue
                  </h3>
                </div>
              )
            }
          />
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
        <Footer/>
      </UserContext.Provider>
    </>
  );
}

export default App;
