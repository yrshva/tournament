import { useState, useEffect } from "react";
import Teams from "./Teams";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import NewTeam from "./NewTeam";

const App = () => {
  const teams = useSelector((state) => state.teams);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    teams.length > 0 && setLoaded(true);
  }, [teams]);

  return (
    <div className="app-container">
      <div className="container position">
        <NewTeam />
        {loaded && <Teams />}
      </div>
    </div>
  );
};

export default App;
