import useFormattedTeams from "./customHooks/useFormattedTeams";

const ScoreTable = () => {
  const formattedTeams = useFormattedTeams();
  const sortedTeams = formattedTeams.sort((a, b) => b.points - a.points);
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
