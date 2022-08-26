import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import UserContext from "../UserContext";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const { giveAlert } = useContext(UserContext);

  const getOrders = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}order/`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          let items = data.orders.reverse();
          setOrders(items);
          
        } else {
          console.log(data.msg);
        }
      });
  };

  const cancelHandle = (id) => {

    if(!window.confirm("Are you sure want to cancel this order ?")){
      return null
    }
    fetch(`${process.env.REACT_APP_BASE_URL}order/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          giveAlert("success", data.msg);
          getOrders();
        } else {
          giveAlert("success", data.msg);
          console.log(data.msg);
        }
      });
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <div className="container my-5 py-4 ">
        <h3 className="ms-3">My Orders</h3>
        {orders.length > 0 ? <div className="container">
          <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Items</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr className="" key={order.order_id}>
                    <td>
                      <Link to={`/order/${order.order_id}`}>
                        #{order.order_id}
                      </Link>
                    </td>
                    <td>
                      {order.items.map((item, index) => (
                        <img
                          key={index}
                          src={item.image}
                          height="40px"
                          width="40px"
                          className="mx-1"
                          alt="..."
                        />
                      ))}
                    </td>
                    <td className="fs-5">&#8377;{order.amount / 100}</td>
                    <td className="text-muted">
                      {order.status === "pending" ? (
                        <span className="text-secondary">Pending</span>
                      ) : order.status === "cancelled" ? (
                        <span className="text-danger">Cancelled</span>
                      ) : (
                        <span className="text-success">Completed</span>
                      )}
                    </td>
                    <td>
                      {order.status === "pending" && (
                        <button
                          className="btn btn-sm btn-outline-danger"
                          id={order.order_id}
                          onClick={(e) => cancelHandle(e.target.id)}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
             
            </tbody>
          </table>
          </div>
        </div> : <Spinner/>}
      </div>
    </>
  );
}
