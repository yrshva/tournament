import { uid } from "uid";

export default function Teams(props) {
  const teams = props.teamsData;
  let matches = [];
  function permutation(array, length) {
    return (matches = array.flatMap((element, i) =>
      length > 1
        ? permutation(array.slice(i + 1), length - 1).map((el) => [
            element,
            ...el,
          ])
        : [[element]]
    ));
  }
  permutation(teams, 2);

  function handleSubmit(event) {
    event.preventDefault();
    teams.map((team, index) => console.log(event.target.team.id.value));
  }

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
            {teams.length > 0 ? (
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
              ))
            ) : (
              <></>
            )}
          </tbody>
        </table>
      </div>
      <div className="games-list col-12 col-md-4  d-flex justify-content-center">
        <table>
          <tbody>
            {teams.length > 1 &&
              matches.map((match, index) => (
                <tr key={index}>
                  {match.map((col, index) =>
                    index % 2 === 0 ? (
                      <td key={index}>
                        {col.name}
                        <form onSubmit={handleSubmit}>
                          <input type="text" name={col.id} />
                        </form>
                      </td>
                    ) : (
                      <td key={index}>
                        <form onSubmit={handleSubmit}>
                          <input type="text" name={col.id} />
                        </form>
                        {col.name}
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
