import { useDispatch, useSelector } from "react-redux";
import { uid } from "uid";
import { addScores } from "../reducers/index";
import Party from "./Party";

const MatchesList = () => {
  const dispatch = useDispatch();

  const scores = useSelector((state) => state.scores);
  const matches = useSelector((state) => state.matches);

  return (
    <div>
      {matches.map((match) => (
        <form
          key={uid()}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              addScores(match, +e.target.left.value, +e.target.right.value)
            );
          }}
        >
          {
            //setting pairs of teams
            match.teams.map((team, i) =>
              i % 2 === 0
                ? Party(match, team, "left", scores)
                : Party(match, team, "right", scores)
            )
          }
          <input type="submit" value="Save" className="btn-custom btn-save" />
        </form>
      ))}
    </div>
  );
};
export default MatchesList;
