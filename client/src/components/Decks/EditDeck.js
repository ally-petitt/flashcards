import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

function EditDeck() {
  const [deck, setDeck] = useState({
    deck_info: {
      title: "",
      description: "",
      color: "#ffffff",
      isStarred: false,
    },
  });
  // use state to rerender components once database is updated
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/decks/${id}`)
      .then((res) => {
        setDeck({
          deck_info: res.data.deck_info,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (isSubmitted === true) {
      axios
        .post(`http://localhost:5000/decks/update/${id}`, deck)
        .then((res) => {
          console.log(res.status);
        })
        .catch((err) => console.log(err));
    }
  }, [isSubmitted]);

  const checkSubmit = () => {
    if (document.getElementById("title").value.trim() !== "") {
      setIsSubmitted(true);
    } else {
      document.getElementById("required-message").classList.remove("d-none");
      document.getElementById("required-message").classList.add("d-block");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitted) {
      history.push("/home");
    }
  };

  return (
    <div className="create-deck_container d-flex justify-content-center align-items-center text-center p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-light rounded w-75 h-75 p-3 p-sm-4 p-md-5"
        id="form"
        style={{ maxWidth: "800px" }}
      >
        <h3>EDIT DECK</h3>
        <label htmlFor="title" className="float-left">
          Title <span className="text-danger">*</span>
        </label>
        <input
          className="form-control form-control-lg my-2"
          type="text"
          id="title"
          defaultValue={deck.deck_info.title}
          onChange={(e) =>
            setDeck({
              ...deck,
              deck_info: { ...deck.deck_info, title: e.target.value },
            })
          }
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
          defaultValue={deck.deck_info.description}
          onChange={(e) =>
            setDeck({
              ...deck,
              deck_info: { ...deck.deck_info, description: e.target.value },
            })
          }
        ></textarea>
        <button
          type="submit"
          className="btn btn-outline-dark mt-3"
          onClick={checkSubmit}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
