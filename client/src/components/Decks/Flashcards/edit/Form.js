import React from "react";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from "react-router-dom";

function Form({ text, deckId, storeData, state, setState, wasSuccessful, front, back }) {

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.card_info.front.trim() === "") {
      document.getElementById("required-message").classList.remove("d-none");
      document.getElementById("required-message").classList.add("d-block");
      return false;
    }

    document.getElementById("form").reset();
    document.getElementById("required-message").classList.add("d-none");
    document.getElementById("required-message").classList.remove("d-block");

    storeData()
  };

  return (
    <>
      <Link to={`/deck/view/${deckId}`}>
        <ChevronLeftIcon fontSize="large" style={{ color: 'white', marginLeft: "10px" }}/>
      </Link>
      <div className="create-deck_container d-flex justify-content-center align-items-center text-center p-5">
        <div className="form-container w-75 position-relative">
          <form
            onSubmit={handleSubmit}
            className="bg-light rounded w-100 h-75 p-3 p-sm-4 p-md-5"
            id="form"
            style={{ maxWidth: "800px" }}
          >
            <h3>{text.title}</h3>
            <label htmlFor="front" className="float-left">
              Front <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control my-3"
              type="text"
              rows="5"
              id="back"
              value={front ? front : ""}
              onChange={(e) =>
                setState({ ...state, card_info:{ ...state.card_info, front: e.target.value }})
              }
            />
            <p
              className="text-danger float-left m-0 mb-2 d-none"
              id="required-message"
            >
              This field is required
            </p>
            <br />
            <label htmlFor="back" className="float-left text-left w-100">
              Back
            </label>
            <textarea
              className="form-control my-3"
              type="text"
              rows="5"
              id="back"
              value={back ? back : ""}
              onChange={(e) =>
                setState({ ...state, card_info:{ ...state.card_info, back: e.target.value }})
              }
            />
            <button type="submit" className="btn btn-outline-dark mt-3">
              {text.btn}
            </button>
            <div className={`text-success text-center border border-success rounded w-auto mt-3 ${wasSuccessful ? "d-block" : "d-none"}`}
            style={{ backgroundColor: "rgba(51, 167, 69, 0.2)"}}>{text.success}</div>

            <div className={`text-danger text-center border border-danger rounded w-auto mt-3 ${wasSuccessful === false ? "d-block" : "d-none"}`}
            style={{ backgroundColor: "rgba(220, 53, 69, 0.2)"}}>{text.fail}</div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Form;
