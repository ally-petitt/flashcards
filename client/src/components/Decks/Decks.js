import React from "react";
import { Link } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";

import Deck from "./Deck";

function Decks() {
  return (
    <div className="p-3 d-flex justify-content-center align-items-center">
      <div className="row w-100">
        <Link
          to="/create-deck"
          className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
        >
          <div
            className="d-flex justify-content-center align-items-center bg-light rounded"
            style={{ height: "200px" }}
          >
            <AddIcon fontSize="large" style={{ fill: "black" }}></AddIcon>
          </div>
        </Link>
        <Deck className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3" />
      </div>
    </div>
  );
}

export default Decks;
