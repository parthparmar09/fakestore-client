import React ,{useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext";

export default function Signup() {
    const {getOtp ,signUp} = useContext(UserContext)


    const otpHandle = (e) => {
      e.preventDefault()
      const btn = e.target
      btn.classList.add('disabled')
      btn.innerText = 'wait 60s'
      setTimeout(() => {
      btn.innerText = 'get OTP'
        btn.classList.remove('disabled')
      },60*1000);
        const email = document.getElementById('inpEmail').value
        getOtp(email)
    }

    const signupHandle = (e) => {
      e.preventDefault()
      const name = document.getElementById("inpName").value
      const email = document.getElementById("inpEmail").value
      const password = document.getElementById("inpPassword").value
      const cpassword = document.getElementById("inpPassword1").value
      const otp = document.getElementById("inpOtp").value

      signUp(name , email , password , cpassword , otp)
    }


  return (
    <div className="container pt-3 sign-forms">
      <div className="container">
        <h2>Sign up</h2>
      </div>
      <div className="container">
        <form
          onSubmit={(e) => {
            
            signupHandle(e)
          }}
        >
          <div className="mb-3">
            <label htmlFor="inpName" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="inpName"
              aria-describedby="emailHelp"
            />
            <label htmlFor="inpEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inpEmail"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inpPassword" className="form-label">
              Password
            </label>
            <input type="password" className="form-control" id="inpPassword" />
          </div>
          <div className="mb-3">
            <label htmlFor="inpPassword1" className="form-label">
              Confirm password
            </label>
            <input type="password" className="form-control" id="inpPassword1" />
          </div>
          <label htmlFor="inpOtp" className="form-label">
              Otp
            </label>
          <div className="mb-2 d-flex">
        
            <input
              type="text"
              name="otp"
              id="inpOtp"
              className="w-25 form-control text-center "
              maxLength={4}
            />

        <button className="mx-2 btn btn-outline-success" onClick={(e) => otpHandle(e)}>get OTP</button>
           
          </div>
          <button type="submit" className="btn btn-secondary my-2" >
            Sign up
          </button>
          
          <span className="m-2">
            <h5>
              or <Link to="/login">Login</Link> here
            </h5>
          </span>
          
        </form>
      </div>
    </div>
  );
}
