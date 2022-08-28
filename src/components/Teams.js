import { uid } from "uid";
import { useState } from "react";

export default function Teams(props) {
  const teams = props.teamsData;
  const [, forceUpdate] = useState();
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
  console.log("_________________________");
  function scoreCalculator(team, index) {
    let win, draw, lost, teamCurrent, teamCompetitor;
    win = draw = lost = teamCurrent = teamCompetitor = 0;
    matches.map((match) => {
      if (
        (match[1].id === team.id || match[2].id === team.id) &&
        (match[1].score !== 0 || match[2].score !== 0)
      ) {
        console.log(match[1].name + match[2].name);
        if (match[1].id === team.id) {
          teamCurrent = match[1];
          teamCompetitor = match[2];
        } else {
          teamCurrent = match[2];
          teamCompetitor = match[1];
        }
        if (teamCurrent.score > teamCompetitor.score) {
          win = win + 1;
        } else if (teamCurrent.score === teamCompetitor.score) {
          draw = draw + 1;
        } else lost = lost + 1;
        console.log(`teamCurrent ${teamCurrent.name}`);
      }
    });
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{team.name}</td>
        <td>{win + draw + lost}</td>
        <td>{win}</td>
        <td>{draw}</td>
        <td>{lost}</td>
        <td>{win * 3 + draw}</td>
      </tr>
    );
  }
  permutation(teams, 2);
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
            {teams.map((team, index) => scoreCalculator(team, index))}
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
                              col.score = Number(e.target.score.value);
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
                              col.score = Number(e.target.score.value);
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
