import { uid } from "uid";

const Party = (match, team, side, scores) => {
  const savedscoresIds = scores.length > 0 && scores.map((el) => el.id);
  const side_id = side === "left" ? 0 : 1;

  return (
    <label key={uid()}>
      <span className="team-left line-wrap">{team.name}</span>
      {savedscoresIds.length > 0 && savedscoresIds.includes(match.id) ? (
        scores.map(
          (el) =>
            el.id === match.id && (
              <input
                key={uid()}
                type="number"
                min="0"
                name={side}
                defaultValue={el.teams[side_id].score}
                required
              />
            )
        )
      ) : (
        <input type="number" min="0" name={side} required />
      )}
    </label>
  );
};

export default Party;
