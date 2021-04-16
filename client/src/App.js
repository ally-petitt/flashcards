import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import EditCard from "./components/EditCard";
import CreateCard from "./components/CreateCard";
import CreateDeck from "./components/CreateDeck";
import Flashcard from "./components/Decks/Flashcards/Flashcard";
import Decks from "./components/Decks/Decks";
import Deck from "./components/Decks/Deck";
import "./App.css";
import EditDeck from "./components/Decks/EditDeck";

function App() {
  return (
    <Router>
      <div
        className="wrapper bg-dark p-0 m-0"
        style={{ minHeight: 100 + "vh" }}
      >
        <header className="p-3 mb-3 border-bottom border-secondary bg-dark">
          <h1 className="h4 m-0">
            <Link to="/home" className="text-light">
              RENAME
            </Link>
          </h1>
        </header>
        <Route path="/home" exact component={Decks} />
        <Route path="/deck/create" component={CreateDeck} />
        <Route path="/deck/view/:id" component={Deck} />
        <Route path="/deck/update/:id" component={EditDeck} />
        <Route path="/card/view/:id" component={Flashcard} />
        <Route path="/card/edit/:id" component={EditCard} />
        <Route path="/card/create" component={CreateCard} />
      </div>
    </Router>
  );
}

export default App;
