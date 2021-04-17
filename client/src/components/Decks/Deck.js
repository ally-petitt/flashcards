import React from "react";
import { Link } from "react-router-dom";

function Deck({ id, title, color }) {
  return (
    <Link
      to={`/deck/view/${id}`}
      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
    >
      <div
        className="d-flex justify-content-center align-items-center rounded"
        style={{ height: "200px", backgroundColor: color }}
      >
        <p className="mb-0 h3 font-weight-bold text-dark">{title}</p>
      </div>
    </Link>
  );
}

export default Deck;
