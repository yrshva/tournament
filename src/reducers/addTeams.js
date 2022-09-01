import { combineReducers } from "redux";
import { uid } from "uid";

const ADD_TEAM = "ADD_TEAM";
const ADD_SCORES = "ADD_SCORES";

export function addScores(scores) {
  return {
    type: ADD_SCORES,
    scores,
  };
}

const defaultScores = [];

function scores(state = defaultScores, action) {
  switch (action.type) {
    case ADD_SCORES:
      return [
        ...state,
        {
          id: uid(),
          name: action.score,
        },
      ];
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
