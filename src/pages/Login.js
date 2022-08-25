import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Login() {
  const { getOtp, signUp, giveAlert } = useContext(UserContext);
  const navigate = useNavigate();

  const otpHandle = (e) => {
    e.preventDefault();
    const btn = e.target;
    btn.classList.add("disabled");
    btn.innerText = "wait 60s";

    setTimeout(() => {
      btn.innerText = "get OTP";

      btn.classList.remove("disabled");
    }, 60 * 1000);
    const email = document.getElementById("inpEmail").value;
    getOtp(email);
  };

  const loginUser = (email, password) => {
    fetch(`${process.env.REACT_APP_BASE_URL}user/login/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          navigate("/");
          giveAlert("success", "logged in successfully");
        } else {
          giveAlert("danger", data.msg);
        }
      })
      .catch((err) => console.log(err));
  };

  const passChangeHandle = (e) => {
    e.preventDefault();
    const email = document.getElementById("inpEmail").value;
    const password = document.getElementById("inpPassword").value;
    const cpassword = document.getElementById("inpPassword1").value;
    const otp = document.getElementById("inpOtp").value;

    signUp("", email, password, cpassword, otp);
  };

  return (
    <div className="container py-5 sign-forms">
      <div className="container">
        <h2>Login</h2>
      </div>
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginUser(e.target[0].value, e.target[1].value);
          }}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-secondary">
            Log In
          </button>
          <span
            className="mx-2 link-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Forgot password?
          </span>
          <div className="my-2">
            <h5>
              or <Link to="/signup">Sign up</Link> here
            </h5>
          </div>
        </form>
      </div>

      <div
        className="modal fade "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Reset password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="" onSubmit={passChangeHandle}>
                <label htmlFor="inpEmail" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="inpEmail"
                  aria-describedby="emailHelp"
                />
                <div className="">
                  <label htmlFor="inpPassword" className="form-label">
                    New password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inpPassword"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inpPassword1" className="form-label">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inpPassword1"
                  />
                </div>
                <label htmlFor="inpOtp" className="form-label">
                  Otp
                </label>
                <div className="d-flex mb-3">
                  <input
                    type="text"
                    name="otp"
                    id="inpOtp"
                    className="w-25 form-control text-center "
                    maxLength={4}
                  />

                  <button
                    className="mx-2 btn btn-outline-success"
                    onClick={otpHandle}
                  >
                    get OTP
                  </button>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success" data-bs-dismiss="modal" >
                    Change
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
