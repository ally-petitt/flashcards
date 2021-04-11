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
      <Route path="/" exact component={Decks} />
      <Route path="/view/:id" component={Flashcards} />
      <Route path="/edit/:id" component={EditCard} />
      <Route path="/create" component={CreateCard} />
    </Router>
  );
}

export default App;
