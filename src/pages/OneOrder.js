import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import UserContext from "../UserContext";

export default function OneOrder() {
  const location = useLocation();
  const { giveAlert } = useContext(UserContext);
  const [order, setOrder] = useState(null);
  const [user, setUser] = useState(null);
  const getOrder = () => {
    if (!localStorage.getItem("token")) {
      return giveAlert("danger", "login/signup first");
    }
    const id = location.pathname.split("/")[2];
    fetch(`${process.env.REACT_APP_BASE_URL}order/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrder(data.order[0]);
        } else {
          return null;
        }
      });
  };

  const getUser = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}user/` , {
      method : "GET",
      headers : {
        'authorization' : `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => res.json()).then(data => {
      if(data.success){
        setUser(data.user)
      }
    })
  }

  const cancelHandle = () => {
    if (!window.confirm("Are you sure want to cancel this order ?")) {
      return null;
    }
    fetch(`${process.env.REACT_APP_BASE_URL}order/${order.order_id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          giveAlert("success", data.msg);
          getOrder();
        } else {
          giveAlert("danger", data.msg);
        }
      });
  };

  useEffect(() => {
    getOrder();
    getUser()
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container my-5 py-4 ">
      {!order ? (
        <Spinner />
      ) : (
        <>
          <h3 className="ms-3">#{order.order_id}</h3>
          <div className="container ">
            <div>
              <h5>
                Status :{" "}
                {order.status === "pending" ? (
                  <>
                    <span className="text-secondary">Pending</span>
                    <button
                      className="btn btn-sm btn-outline-danger ms-2"
                      onClick={cancelHandle}
                    >
                      Cancel
                    </button>
                  </>
                ) : order.status === "cancelled" ? (
                  <span className="text-danger">Cancelled</span>
                ) : (
                  <span className="text-success">Completed</span>
                )}
              </h5>
            </div>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => {
                    return (
                      <tr className="" key={item.id}>
                        <td>
                          <img
                            key={item.id}
                            src={item.image}
                            height="50px"
                            width="50px"
                            className="mx-1"
                            alt="..."
                          />
                        </td>
                        <td>
                          <Link to={`/product/${item.id}`}>{item.title}</Link>
                        </td>
                        <td className="fs-5">{item.qty}</td>
                        <td className="fs-5">&#8377;{item.price * item.qty}</td>
                      </tr>
                    );
                  })}
                  <tr className="fs-5">
                    <td colSpan="2" className="text-muted">
                     + delivery : &#8377;49
                    </td>
                    <td className="">Total :</td>
                    <td className="mx-auto fw-bold ">
                      &#8377;{order.amount / 100}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h5 className="mt-3">Shipping details: <Link to='' className="link-secondary fs-6 ">(download receipt)</Link></h5>
            <div className="container">
              <h6 className="my-0">{user?.name.toUpperCase()}</h6>
              <p>{user?.email} <br />{order.address.locality} , <br />
              {order.address.state} : {order.address.pin}</p>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
}
