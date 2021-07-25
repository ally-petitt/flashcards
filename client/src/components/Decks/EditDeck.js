import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";

function EditDeck() {
  const [deck, setDeck] = useState({
    deck_info: {
      title: "",
      description: "",
      color: "#ffffff",
      isStarred: false,
    },
  });

  const { id } = useParams();
  const history = useHistory();   

  useEffect(() => {
    axios
      .get(`http://localhost:4000/decks/${id}`)
      .then((res) => {
        setDeck({
          deck_info: res.data.deck_info,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const submitIsValid = () => {
    if (document.getElementById("title").value.trim() === "") {
      document.getElementById("required-message").classList.remove("d-none");
      document.getElementById("required-message").classList.add("d-block");

      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitIsValid()) {
      const response = await axios
        .post(`http://localhost:4000/decks/update/${id}`, deck)
        .catch((err) => console.log(err));

      history.push("/home");
    }
  };

  const handleDelete = () => {
    // confirm that they would like to delete
    if (window.confirm("Are you sure you want to delete this deck?")) {
      // show that deck was deleted
      document.getElementById("after-delete").classList.remove("d-none");
      document.getElementById("after-delete").classList.add("d-block");
      document.getElementById("delete-notif").classList.add("d-flex");

      // remove buttons
      const buttons = document.getElementsByClassName("btn");
      for (const button of buttons) {
        button.classList.add("d-none");
      }

      // update database
      axios
        .delete(`http://localhost:4000/decks/delete/${id}`)
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="create-deck_container d-flex justify-content-center align-items-center text-center p-5">
      <div
        className="bg-light rounded w-75 h-75 p-3 p-sm-4 p-md-5"
        style={{ maxWidth: "800px" }}
      >
        <form onSubmit={handleSubmit} id="form">
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
          <button type="submit" className="btn btn-outline-dark my-3">
            Save
          </button>
        </form>
        <button className="btn btn-outline-danger" onClick={handleDelete}>
          Delete
        </button>
        <div id="after-delete" className="w-75 mx-auto mt-4 d-none">
          <div
            className="border border-danger text-danger w-100 align-items-center justify-content-center rounded mb-3"
            style={{
              height: "50px",
              backgroundColor: "rgba(220, 53, 69, 0.2)",
              borderWidth: "3px",
            }}
            id="delete-notif"
          >
            <p className="p-1 m-0">Deck was deleted</p>
          </div>
          <Link to="/home">Return home</Link>
        </div>
      </div>
    </div>
  );
}

export default EditDeck;
