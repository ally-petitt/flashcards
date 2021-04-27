import { Link } from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import React from "react";
import { useParams } from "react-router";

function Review() {
  const { id } = useParams();

  return (
    <>
      <Link
        to={`/deck/view/${id}`}
        style={{ color: "white", marginLeft: "22px" }}
      >
        <ChevronLeftIcon fontSize="large" />
      </Link>
      <div
        className="container d-flex justify-content-center align-items-center position-absolute flex-column text-center text-light"
        style={{
          height: "100vh",
          width: "100vw",
          top: "0",
          left: "0",
          right: "0",
        }}
      >
        <p className="h2">Front</p>
        <button className="btn btn-outline-light mt-4">Flip</button>
        <button className="btn btn-outline-success mt-4">Next Card</button>
      </div>
    </>
  );
}

export default Review;
