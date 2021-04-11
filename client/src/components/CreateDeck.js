import React, { useState } from "react";

function CreateDeck() {
  const [deckData, setDeckData] = useState({
    deck_title: "",
    deck_description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    document.getElementById("form").reset();
  };

  // TODO: require title
  // TODO: Update state on change

  return (
    <div className="create-deck_container d-flex justify-content-center align-items-center text-center p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-light rounded w-75 h-75 p-5"
        id="form"
        style={{ maxWidth: "800px" }}
      >
        <h3>CREATE A NEW DECK</h3>
        <label htmlFor="title" className="float-left">
          Title
        </label>
        <input
          className="form-control form-control-lg my-3"
          type="text"
          id="title"
          required
        />
        <label htmlFor="description" className="float-left">
          Description
        </label>
        <textarea
          className="form-control my-3"
          type="text"
          rows="5"
          id="description"
        />
        <button type="submit" className="btn btn-outline-dark mt-3">
          Create Deck
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
