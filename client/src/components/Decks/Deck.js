import React from "react";
import { Link } from "react-router-dom";

// TODO: the problem was with this component

function Deck({ id, title, color }) {
  return (
    <div className="p-3 d-flex justify-content-center align-items-center">
      <div className="row w-100">
        <Link
          to={`/deck/view/${id}`}
          className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
        >
          <div
            className="d-flex justify-content-center align-items-center rounded"
            style={{ height: "200px", backgroundColor: color }}
          >
            <p>{title}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Deck;
