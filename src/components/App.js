import { useState, useEffect } from "react";
import Teams from "./Teams";
import { uid } from "uid";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";

const App = () => {
  const savedteams = JSON.parse(window.localStorage.getItem("teams"));
  const [teams, setTeams] = useState(savedteams ? savedteams : []);
  const [loaded, setLoaded] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTeams([
      ...teams,
      {
        id: uid(),
        name: event.target.team_name.value,
      },
    ]);
    event.target.team_name.value = "";
  };
  const showSearch = () => {
    return (
      <div className="col-12 col-lg-7 d-flex justify-content-center">
        <form className="d-flex" onSubmit={handleSubmit}>
          <input
            type="text"
            name="team_name"
            placeholder="New team"
            className="form-control me-3"
            required
          />
          <input type="submit" placeholder="Add" className="btn btn-dark" />
        </form>
      </div>
    );
  };
  useEffect(() => {
    setLoaded(true);
  }, [teams]);
  useEffect(() => {
    window.localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);
  if (loaded) {
    return (
      <div className="app-container">
        <div className="container position">
          {showSearch()}
          <Teams teamsData={teams} />
        </div>
      </div>
    );
  } else
    return (
      <div className="app-container">
        <div className="container position">{showSearch()}</div>
      </div>
    );
};

export default App;
