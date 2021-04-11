import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import EditCard from "./components/EditCard";
import CreateCard from "./components/CreateCard";
import Flashcards from "./components/Decks/Flashcards/Flashcard";
import Decks from "./components/Decks/Decks";
import "./App.css";

function App() {
  return (
    <Router>
      <div
        className="wrapper bg-dark p-0 m-0"
        style={{ minHeight: 100 + "vh" }}
      >
        <header className="p-3 mb-3 border-bottom border-secondary bg-dark">
          <h1 className="h4 m-0">
            <Link to="/" className="text-light">
              RENAME
            </Link>
          </h1>
        </header>
        <Route path="/" exact component={Decks} />
        <Route path="/view/:id" component={Flashcards} />
        <Route path="/edit/:id" component={EditCard} />
        <Route path="/create" component={CreateCard} />
      </div>
    </Router>
  );
}

export default App;
