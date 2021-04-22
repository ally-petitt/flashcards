import React, { useState } from "react";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./flashcard.css";

function Flashcard({ front, back, deckId, cardId }) {
  const [active, setActive] = useState(false);

  return (
    <div
      className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="position-relative deck">
        <div
          className="d-flex justify-content-center align-items-center bg-light rounded"
          style={{ height: "200px" }}
        >
          <Link to={`/deck/${deckId}/card/update/${cardId}`}>
            <MoreVertIcon
              id="moreVertIcon"
              className={`position-absolute ${!active ? "d-md-none" : null}`}
              style={{ top: "10px", right: "10px", color: "#ababab" }}
            />
          </Link>
          <Link
            to={`/deck/${deckId}/card/view/${cardId}`}
            className="w-100 h-100 d-flex justify-content-center align-items-center"
          >
            <p className="mb-0 h3 font-weight-bold text-dark title">{front}</p>
          </Link>
        </div>
        <Link to={`/deck/${deckId}/card/view/${cardId}`} >
          <div id="overlay" className="text-dark">
            <div>{back}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Flashcard;