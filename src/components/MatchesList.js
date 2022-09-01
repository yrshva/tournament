import { useDispatch, useSelector } from "react-redux";
import { addScores } from "../reducers/index";

const MatchesList = () => {
  const dispatch = useDispatch();
  const scores = useSelector((state) => state.scores);
  const savedscoresIds = scores.length > 0 && scores.map((el) => el.id);
  const matches = useSelector((state) => state.matches);
  return (
    <div>
      {matches.map((match, index) => (
        <form
          key={index}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch(
              addScores(
                match,
                Number(e.target.team1.value),
                Number(e.target.team2.value)
              )
            );
          }}
        >
          {
            //setting pairs of teams
            match.teams.map((team, i) =>
              i % 2 === 0 ? (
                //left team
                <label key={i} className="">
                  <span className="team-left line-wrap">{team.name}</span>
                  {savedscoresIds.length > 0 &&
                  savedscoresIds.includes(match.id) ? (
                    scores.map(
                      (el, j) =>
                        el.id === match.id && (
                          <input
                            key={j}
                            type="number"
                            min="0"
                            name="team1"
                            defaultValue={el.teams[0].score}
                            required
                          />
                        )
                    )
                  ) : (
                    <input type="number" min="0" name="team1" required />
                  )}
                </label>
              ) : (
                //right team
                <label key={i}>
                  :
                  {savedscoresIds.length > 0 &&
                  savedscoresIds.includes(match.id) ? (
                    scores.map(
                      (el, j) =>
                        el.id === match.id && (
                          <input
                            key={j}
                            type="number"
                            min="0"
                            name="team2"
                            defaultValue={el.teams[1].score}
                            required
                          />
                        )
                    )
                  ) : (
                    <input type="number" min="0" name="team2" required />
                  )}
                  <span className="team-right line-wrap">{team.name}</span>
                </label>
              )
            )
          }
          <input type="submit" value="Save" className="btn-custom btn-save" />
        </form>
      ))}
    </div>
  );
};
export default MatchesList;
