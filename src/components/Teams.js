export default function Teams(props) {
  const name = props.name;
  console.log(name);
  return (
    <table className="table table-hover table-dark mt-4">
      <thead>
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
        <tr>
          <th scope="row">1</th>
          <td>{name}</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  );
}
