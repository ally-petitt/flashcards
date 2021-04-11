import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

import Deck from "./Deck";

function Decks() {
  return (
    <div className="p-3">
      <div className="row w-100">
        <Link to="/create" className="col-6 col-sm-4 col-md-3 mb-3">
          <div
            className="d-flex justify-content-center align-items-center bg-light rounded"
            style={{ height: "200px" }}
          >
            <AddIcon fontSize="large" style={{ fill: "black" }}></AddIcon>
          </div>
        </Link>
      </div>
      <Deck />
    </div>
  );
}

export default Decks;
