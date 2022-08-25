import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import UserContext from "../UserContext";

export default function OneOrder() {
  const location = useLocation();
  const { giveAlert } = useContext(UserContext);
  const [order, setOrder] = useState(null);
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
  useEffect(() => {
    getOrder();
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
            <h5>Status : {order.status === "pending" ? (
                        <span className="text-secondary">Pending</span>
                      ) : order.status === "cancelled" ? (
                        <span className="text-danger">Cancelled</span>
                      ) : (
                        <span className="text-success">Completed</span>
                      )}</h5>
            <h5 className="text-muted">Amount : <span className="fw-bold text-dark"> &#8377;{order.amount/100}</span></h5>
          </div>
        </>
      )}
    </div>
  );
}
