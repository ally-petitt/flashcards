import React, { useState } from "react";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";

function Deck({ id, title, color }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="position-relative">
        <div
          className="d-flex justify-content-center align-items-center rounded"
          style={{ height: "200px", backgroundColor: color }}
        >
          <Link to={`/deck/update/${id}`}>
            <MoreVertIcon
              id="moreVertIcon"
              className={`position-absolute ${!active ? "d-md-none" : null}`}
              style={{ top: "10px", right: "10px", color: "#ababab" }}
            />
          </Link>
          <Link
            to={`/deck/view/${id}`}
            className="w-100 h-100 d-flex justify-content-center align-items-center"
          >
            <p className="mb-0 h3 font-weight-bold text-dark">{title}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Deck;
