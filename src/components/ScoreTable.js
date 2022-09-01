import { useSelector } from "react-redux";

const ScoreTable = () => {
  const scores = useSelector((state) => state.scores);
  const teams = useSelector((state) => state.teams);
  teams.map((team) => {
    let win, draw, lost, teamCurrent, teamCompetitor;
    win = draw = lost = teamCurrent = teamCompetitor = 0;
    scores &&
      [...scores].map((score) => {
        if (
          (score.teams[0].id === team.id || score.teams[1].id === team.id) &&
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

export default ScoreTable;
