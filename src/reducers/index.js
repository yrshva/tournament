import { combineReducers } from "redux";
import { uid } from "uid";

const ADD_TEAM = "ADD_TEAM";
const ADD_SCORES = "ADD_SCORES";

export function addScores(match, team1_score, team2_score) {
  return {
    type: ADD_SCORES,
    match,
    team1_score,
    team2_score,
  };
}

const defaultScores = [];

function scores(state = defaultScores, action) {
  const uniqueIds = [];
  switch (action.type) {
    case ADD_SCORES:
      return [
        ...state,
        {
          id: action.match.id,
          teams: [
            {
              id: action.match.teams[0].id,
              name: action.match.teams[0].name,
              score: action.team1_score,
            },
            {
              id: action.match.teams[1].id,
              name: action.match.teams[1].name,
              score: action.team2_score,
            },
          ],
        },
      ]
        .reverse()
        .filter((element) => {
          const isDuplicate = uniqueIds.includes(element.id);
          if (!isDuplicate) {
            uniqueIds.push(element.id);
            return true;
          }
          return false;
        })
        .reverse();
    default:
      return state;
  }
}
export function addTeam(team) {
  return {
    type: ADD_TEAM,
    team,
  };
}

const defaultTeam = [];

function teams(state = defaultTeam, action) {
  switch (action.type) {
    case ADD_TEAM:
      return [
        ...state,
        {
          id: uid(),
          name: action.team,
        },
      ];
    default:
      return state;
  }
}
const tournamentApp = combineReducers({
  teams,
  scores,
});

export default tournamentApp;
