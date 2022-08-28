import { uid } from "uid";
import { useState } from "react";

export default function Teams(props) {
  const teams = props.teamsData;
  const [update, forceUpdate] = useState();
  let matches = [];
  function permutation(array, length) {
    let init = 0;
    return (matches = array.flatMap((element, i) =>
      length > 1
        ? permutation(array.slice(i + 1), length - 1).map((el, index) => [
            { id: (init = init + 1) },
            element,
            ...el,
          ])
        : [[element]]
    ));
  }
  permutation(teams, 2);
  console.log(matches);
  return (
    <div className="tables row">
      <div className="col-12 col-md-8 score-table d-flex justify-content-center">
        <table className="table table-dark table-bordered table-width">
          <thead className="thead-dark">
            <tr>
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
            {teams.length > 0 &&
              teams.map((team, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{team.name}</td>
                  <td>{team.played}</td>
                  <td>{team.win}</td>
                  <td>{team.draw}</td>
                  <td>{team.lost}</td>
                  <td>{team.win * 3 + team.draw}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="games-list col-12 col-md-4  d-flex justify-content-center">
        <table>
          <tbody>
            {teams.length > 1 &&
              matches.map((match, index) => (
                <tr key={index}>
                  {match.map(
                    (col, index) =>
                      index !== 0 &&
                      (index % 2 !== 0 ? (
                        <td key={index}>
                          {col.name}
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              col.score = e.target.score.value;
                              forceUpdate(uid());
                            }}
                            className="ms-3"
                          >
                            <input type="text" name="score" />
                          </form>
                        </td>
                      ) : (
                        <td key={index}>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              col.score = e.target.score.value;
                              forceUpdate(uid());
                            }}
                            className="me-3"
                          >
                            <input type="text" name="score" />
                          </form>
                          {col.name}
                        </td>
                      ))
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
