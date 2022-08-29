import { uid } from "uid";
import { useEffect, useState } from "react";

export default function Teams(props) {
  const teams = props.teamsData;
  const [, forceUpdate] = useState();
  const [matches, setMatches] = useState([]);
  function permutation(array, length) {
    let init = 0;
    return array.flatMap((element, i) =>
      length > 1
        ? permutation(array.slice(i + 1), length - 1).map((el) => [
            { id: (init = init + 1) },
            element,
            ...el,
          ])
        : [[element]]
    );
  }
  console.log("_________________________");
  function scoreCalculator(team, index) {
    let win, draw, lost, teamCurrent, teamCompetitor;
    win = draw = lost = teamCurrent = teamCompetitor = 0;
    matches.map((match) => {
      if (
        (match[1].id === team.id || match[2].id === team.id) &&
        match[1].score &&
        match[2].score
      ) {
        match.map((el) =>
          el.id === team.id ? (teamCurrent = el) : (teamCompetitor = el)
        );

        if (teamCurrent.score > teamCompetitor.score) {
          return (win = win + 1);
        } else if (teamCurrent.score === teamCompetitor.score) {
          return (draw = draw + 1);
        } else return (lost = lost + 1);
      } else return null;
    });
    console.log(
      ` ${teamCurrent.name} -  ${teamCurrent.score} : ${teamCompetitor.score} - ${teamCompetitor.name}  `
    );
    /*console.log(
      `teamCurrent ${teamCurrent.name}
        lost: ${lost}
        win: ${win}
        draw: ${draw}
        `
    );*/
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
  useEffect(() => {
    setMatches(permutation(teams, 2));
  }, [teams]);

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
                    (team, index) =>
                      index !== 0 &&
                      (index % 2 !== 0 ? (
                        <td key={index}>
                          {team.name}
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();

                              matches.map(
                                (m) =>
                                  m[0].id === match[0].id &&
                                  m.map(
                                    (el) =>
                                      el.id === team.id &&
                                      (el.score = e.target.score.value) &&
                                      forceUpdate(uid())
                                  )
                              );
                            }}
                            className="ms-3"
                          >
                            <input type="number" min="0" name="score" />
                          </form>
                        </td>
                      ) : (
                        <td key={index}>
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              matches.map(
                                (m) =>
                                  m[0].id === match[0].id &&
                                  m.map(
                                    (el) =>
                                      el.id === team.id &&
                                      (el.score = e.target.score.value) &&
                                      forceUpdate(uid())
                                  )
                              );
                            }}
                            className="me-3"
                          >
                            <input type="number" min="0" name="score" />
                          </form>
                          {team.name}
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
