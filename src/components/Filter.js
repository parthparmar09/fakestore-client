import React from "react";

export default function Filter() {
  return (
    <>
      <div className="container fixed-bottom mb-5">
        <button
          className="btn btn-success btn-lg rounded-circle "
          id="filterBtn"
          data-bs-toggle="modal"
          data-bs-target="#filterModal"
        >
          <i className="fa-solid fa-filter"></i>
        </button>
      </div>
      <div className="modal fade" id="filterModal" tabIndex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="filterModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        ...
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success">Save changes</button>
      </div>
    </div>
  </div>
</div>
    
    </>
  );
}
