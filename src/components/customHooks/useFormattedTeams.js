import { useSelector } from "react-redux";

const useFormattedTeams = () => {
  const scores = useSelector((state) => state.scores);
  const teams = useSelector((state) => state.teams);
  const newTeams = teams.map((team) => {
    let win, draw, lost, teamCurrent, teamCompetitor;
    win = draw = lost = teamCurrent = teamCompetitor = 0;
    scores.length > 0 &&
      scores.map((score) => {
        //filling new array of Teams with new values: played, win, draw, lost, points
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
    return {
      id: team.id,
      name: team.name,
      played: win + draw + lost,
      win: win,
      draw: draw,
      lost: lost,
      points: win * 3 + draw,
    };
  });
  return newTeams;
};
export default useFormattedTeams;
