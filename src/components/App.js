import { useState, useEffect } from "react";
import Teams from "./Teams";
import { useDispatch, useSelector } from "react-redux";
import { addTeam } from "../reducers/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";

const App = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const [loaded, setLoaded] = useState(false);

  const showSearch = () => {
    return (
      <div className="col-12 col-lg-7 d-flex justify-content-center">
        <form
          className="d-flex"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(addTeam(e.target.team_name.value));
            e.target.team_name.value = "";
          }}
        >
          <input
            type="text"
            name="team_name"
            placeholder="New team"
            className="form-control me-3"
            required
          />
          <input
            type="submit"
            placeholder="Add"
            className="btn-custom btn-submit"
          />
        </form>
      </div>
    );
  };
  useEffect(() => {
    teams.length > 0 && setLoaded(true);
  }, [teams]);

  if (loaded) {
    return (
      <div className="app-container">
        <div className="container position">
          {showSearch()}
          <Teams />
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
