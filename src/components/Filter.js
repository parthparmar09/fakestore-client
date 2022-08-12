import React, { useContext } from "react";
import UserContext from "../UserContext";

export default function Filter() {
  const { setSort } = useContext(UserContext);
  const handleSort = (e) => {
    setSort(e.target.value);
  };

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
      <div
        className="modal fade"
        id="filterModal"
        tabIndex="-1"
        aria-labelledby="filterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="filterModalLabel">
                Filters/Sort
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center">
                <h5>Sort by : </h5>
                <select
                  className="form-select w-50 ms-2"
                  name="sort"
                  onChange={handleSort}
                  aria-label=""
                >
                  <option value="def">Relevance</option>
                  <option value="pop">Popularity</option>
                  <option value="asc">Price: Low to High </option>
                  <option value="desc">Price: High to Low</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
