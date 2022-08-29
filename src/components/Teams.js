import { uid } from "uid";
import { useEffect, useState } from "react";

export default function Teams(props) {
  const teams = props.teamsData;
  const [, forceUpdate] = useState();
  const [matches, setMatches] = useState();
  const [loading, isLoading] = useState(true);

  console.log("_________________________");
  function scoreCalculator(team, index) {
    let win, draw, lost, teamCurrent, teamCompetitor;
    win = draw = lost = teamCurrent = teamCompetitor = 0;
    matches &&
      matches.map((match) => {
        if (
          (match.teams[0].id === team.id || match.teams[1].id === team.id) &&
          match.teams[0].score !== undefined &&
          match.teams[1].score !== undefined
        ) {
          match.teams.map((el) =>
            el.id === team.id ? (teamCurrent = el) : (teamCompetitor = el)
          );
          console.log(
            ` ${teamCurrent.name} -  ${teamCurrent.score} : ${teamCompetitor.score} - ${teamCompetitor.name}  `
          );
          if (teamCurrent.score > teamCompetitor.score) {
            return (win = win + 1);
          } else if (teamCurrent.score === teamCompetitor.score) {
            return (draw = draw + 1);
          } else return (lost = lost + 1);
        } else return null;
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
  useEffect(() => {
    function permutation(array, length) {
      let init = 0;
      return array.flatMap((element, i) =>
        length > 1
          ? permutation(array.slice(i + 1), length - 1).map((el) => ({
              id: (init = init + 1),
              teams: [element, ...el],
            }))
          : [[element]]
      );
    }
    setMatches(permutation(teams, 2));
    isLoading(false);
  }, [teams]);

  console.log(matches);

  return loading ? (
    <></>
  ) : (
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
                  {match.teams.map((team, index) =>
                    index % 2 === 0 ? (
                      <td key={index}>
                        {team.name}
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            (team.score = Number(e.target.score.value)) &&
                              forceUpdate(uid());
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
                            (team.score = Number(e.target.score.value)) &&
                              forceUpdate(uid());
                          }}
                          className="me-3"
                        >
                          <input type="number" min="0" name="score" />
                        </form>
                        {team.name}
                      </td>
                    )
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
