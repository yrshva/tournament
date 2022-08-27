import { useState } from "react";
import Teams from "./Teams";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";

function App() {
  const [input, setInput] = useState("");
  const [team, setTeam] = useState(null);
  function updateInput(event) {
    setInput(event.target.value);
  }
  function handleSubmit(event) {
    event.preventDefault();
    setTeam(input);
    setInput("");
  }
  function showSearch() {
    return (
      <form className="d-flex justify-content-center" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="New team"
          className="form-control me-3 input-width"
          onChange={updateInput}
          value={input}
        />
        <input type="submit" placeholder="Add" className="btn btn-dark" />
      </form>
    );
  }

  if (team) {
    return (
      <div className="app-container">
        <div className="container verital-align">
          {showSearch()}
          <Teams name={team} />
        </div>
      </div>
    );
  } else
    return (
      <div className="app-container">
        <div className="container verital-align">{showSearch()}</div>
      </div>
    );
}

export default App;
