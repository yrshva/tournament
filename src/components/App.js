import { useState } from "react";
import Teams from "./Teams";
import { uid } from "uid";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";

function App() {
  const [teams, setTeams] = useState([]);
  const [loaded, setLoaded] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(teams);
    setTeams([
      ...teams,
      {
        id: uid(),
        name: event.target.team_name.value,
        played: 0,
        win: 0,
        draw: 0,
        lost: 0,
      },
    ]);
    event.target.team_name.value = "";
    setLoaded(true);
  }
  function showSearch() {
    return (
      <form className="d-flex justify-content-center" onSubmit={handleSubmit}>
        <input
          type="text"
          name="team_name"
          placeholder="New team"
          className="form-control me-3 input-width"
        />
        <input type="submit" placeholder="Add" className="btn btn-dark" />
      </form>
    );
  }

  if (loaded) {
    return (
      <div className="app-container">
        <div className="container verital-align">
          {showSearch()}
          <Teams teamsData={teams} />
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
