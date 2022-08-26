import React, { useContext } from "react";
import UserContext from "../UserContext";

export default function Contact() {
  const {giveAlert} = useContext(UserContext)

  const handleSend = (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const message = document.getElementById('message').value
    e.target.reset()

    if(!email || !message){
      return giveAlert('warning' , 'all fields are required')
    }
    const obj = {
      email,
      message
    }
    console.log(obj)
    giveAlert('success' , 'message sent!')
    
  }
  return (
    <div className="container my-5 py-5">
      <div className="container">
        <h3>Contact us</h3>
      </div>
      <form className="container" onSubmit={handleSend}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="name@example.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message 
          </label>
          <textarea
            className="form-control"
            id="message"
            rows="3"
          ></textarea>
        </div>
        <button className="btn btn-secondary" type="submit">Send</button>
      </form>
    </div>
  );
}
