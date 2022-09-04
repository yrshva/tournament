import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMatch } from "../reducers/index";
import ScoreTable from "./ScoreTable";
import MatchesList from "./MatchesList";

const Teams = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    dispatch(addMatch(teams));
    setIsLoading(false);
  }, [teams, dispatch]);

  return (
    !loading && (
      <div className="tables row">
        <div className="col-12 col-lg-7 score-table">
          <table className="table table-dark table-bordered table-width">
            <thead className="thead-dark">
              <tr className="font">
                <th scope="col">Place</th>
                <th scope="col">Team</th>
                <th scope="col">Played</th>
                <th scope="col">Win</th>
                <th scope="col">Draw</th>
                <th scope="col">Lost</th>
                <th scope="col">Points</th>
              </tr>
            </thead>
            <tbody>
              <ScoreTable />
            </tbody>
          </table>
        </div>
        <div className="games-list col-12 col-lg-5 d-flex justify-content-center">
          <MatchesList />
        </div>
      </div>
    )
  );
};
export default Teams;
