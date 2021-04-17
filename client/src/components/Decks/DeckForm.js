import React from "react";

function DeckForm({
  title,
  buttonText,
  state,
  setState,
  handleSubmit,
  deckTitle,
  deckDesc,
}) {
  return (
    <div className="create-deck_container d-flex justify-content-center align-items-center text-center p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-light rounded w-75 h-75 p-3 p-sm-4 p-md-5"
        id="form"
        style={{ maxWidth: "800px" }}
      >
        <h3>{title}</h3>
        <label htmlFor="title" className="float-left">
          Title <span className="text-danger">*</span>
        </label>
        <input
          className="form-control form-control-lg my-2"
          type="text"
          id="title"
          defaultValue={deckTitle}
          onChange={(e) => setState({ ...state, title: e.target.value })}
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
          defaultValue={deckDesc}
          onChange={(e) => setState({ ...state, description: e.target.value })}
        ></textarea>
        <button type="submit" className="btn btn-outline-dark mt-3">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default DeckForm;
