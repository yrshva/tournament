import { uid } from "uid";
import { useEffect, useState } from "react";

const Teams = (props) => {
  const teams = props.teamsData;
  const [, forceUpdate] = useState();
  const [matches, setMatches] = useState();
  const [loading, isLoading] = useState(true);
  const [scores, setScores] = useState([]);
  const scoreCalculator = () => {
    teams.map((team) => {
      let win, draw, lost, teamCurrent, teamCompetitor;
      win = draw = lost = teamCurrent = teamCompetitor = 0;
      const uniqueIds = [];
      scores &&
        [...scores]
          .reverse()
          .filter((element) => {
            const isDuplicate = uniqueIds.includes(element.id);
            if (!isDuplicate) {
              uniqueIds.push(element.id);
              return true;
            }
            return false;
          })
          .map((score) => {
            if (
              (score.teams[0].id === team.id ||
                score.teams[1].id === team.id) &&
              score.teams[0].score !== undefined &&
              score.teams[1].score !== undefined
            ) {
              score.teams.map((el) =>
                el.id === team.id ? (teamCurrent = el) : (teamCompetitor = el)
              );
              if (teamCurrent.score > teamCompetitor.score) {
                return (win = win + 1);
              } else if (teamCurrent.score === teamCompetitor.score) {
                return (draw = draw + 1);
              } else return (lost = lost + 1);
            } else return null;
          });
      team.played = win + draw + lost;
      team.win = win;
      team.draw = draw;
      team.lost = lost;
      team.points = win * 3 + draw;
      return null;
    });
    const sortedTeams = [...teams].sort((a, b) => b.points - a.points);
    return sortedTeams.map((team, index) => (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td className="width line-wrap">{team.name}</td>
        <td>{team.played}</td>
        <td>{team.win}</td>
        <td>{team.draw}</td>
        <td>{team.lost}</td>
        <td>{team.points}</td>
      </tr>
    ));
  };
  useEffect(() => {
    const permutation = (array, length) => {
      let init = 0;
      return array.flatMap((element, i) =>
        length > 1
          ? permutation(array.slice(i + 1), length - 1).map((el) => ({
              id: (init = init + 1),
              teams: [element, ...el],
            }))
          : [[element]]
      );
    };
    setMatches(permutation(teams, 2));
    isLoading(false);
  }, [teams]);
  useEffect(() => {
    const scores = JSON.parse(localStorage.getItem("scores"));
    if (teams) {
      setScores(scores);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("scores", JSON.stringify(scores));
  }, [scores]);

  return loading ? (
    <></>
  ) : (
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
          <tbody>{scoreCalculator()}</tbody>
        </table>
      </div>
      <div className="games-list col-12 col-lg-5 d-flex justify-content-center">
        <div>
          {matches.map((match, index) => (
            <form
              key={index}
              onSubmit={(e) => {
                e.preventDefault();
                setScores([
                  ...scores,
                  {
                    id: match.id,
                    teams: [
                      {
                        id: match.teams[0].id,
                        name: match.teams[0].name,
                        score: Number(e.target.team1.value),
                      },
                      {
                        id: match.teams[1].id,
                        name: match.teams[1].name,
                        score: Number(e.target.team2.value),
                      },
                    ],
                  },
                ]);
                forceUpdate(uid());
              }}
            >
              {match.teams.map((team, i) =>
                i % 2 === 0 ? (
                  <label key={i} className="">
                    <span className="team-left line-wrap">{team.name}</span>
                    <input type="number" min="0" name="team1" required />
                  </label>
                ) : (
                  <label key={i}>
                    :
                    <input type="number" min="0" name="team2" required />
                    <span className="team-right line-wrap">{team.name}</span>
                  </label>
                )
              )}
              <input
                type="submit"
                value="Save"
                className="btn btn-dark btn-sm btn-custom"
              />
            </form>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Teams;
