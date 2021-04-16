import React, { useState } from "react";
import axios from "axios";

function CreateDeck() {
  const [deckData, setDeckData] = useState({
    title: "",
    description: "",
    color: "#ffffff",
    isStarred: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deckData.title.trim() === "") {
      document.getElementById("required-message").classList.remove("d-none");
      document.getElementById("required-message").classList.add("d-block");
      return false;
    }

    document.getElementById("form").reset();
    document.getElementById("required-message").classList.add("d-none");
    document.getElementById("required-message").classList.remove("d-block");

    const newDeck = {
      deck_info: {
        deck_title: deckData.title,
        deck_description: deckData.description,
        deck_color: deckData.color,
      },
    };

    // send post request
    axios.post("http://localhost:5000/decks/create", newDeck).then(
      (res) => console.log(res.data),
      (err) => console.log(err)
    );
    // reset state
    setDeckData({
      title: "",
      description: "",
      color: "#ffffff",
    });
  };

  return (
    <div className="create-deck_container d-flex justify-content-center align-items-center text-center p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-light rounded w-75 h-75 p-3 p-sm-4 p-md-5"
        id="form"
        style={{ maxWidth: "800px" }}
      >
        <h3>CREATE A NEW DECK</h3>
        <label htmlFor="title" className="float-left">
          Title <span className="text-danger">*</span>
        </label>
        <input
          className="form-control form-control-lg my-2"
          type="text"
          id="title"
          onChange={(e) => setDeckData({ ...deckData, title: e.target.value })}
        />
        <p
          className="text-danger float-left m-0 mb-2 d-none"
          id="required-message"
        >
          The title is required
        </p>
        <br />
        <label htmlFor="description" className="float-left text-left w-100">
          Description
        </label>
        <textarea
          className="form-control my-3"
          type="text"
          rows="5"
          id="description"
          onChange={(e) =>
            setDeckData({ ...deckData, description: e.target.value })
          }
        />
        <button type="submit" className="btn btn-outline-dark mt-3">
          Create Deck
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
