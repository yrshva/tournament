import { combineReducers } from "redux";
import { uid } from "uid";

const ADD_TEAM = "ADD_TEAM";
const ADD_MATCHES = "ADD_MATCHES";
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

export function addMatch(team) {
  return {
    type: ADD_MATCHES,
    team,
  };
}

const defaultMatches = [];

function matches(state = defaultMatches, action) {
  switch (action.type) {
    case ADD_MATCHES:
      const permutation = (array, length) => {
        let init = 0;
        return array.flatMap((element, i) =>
          length > 1
            ? permutation(array.slice(i + 1), length - 1).map((el) => ({
                id: (init = init + 1),
                teams: [element, ...el],
              }))
            : [[element]]
        );
      };
      return permutation(action.team, 2);
    default:
      return state;
  }
}

export function addTeam(name) {
  return {
    type: ADD_TEAM,
    name,
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
          name: action.name,
        },
      ];
    default:
      return state;
  }
}
const tournamentApp = combineReducers({
  teams,
  scores,
  matches,
});

export default tournamentApp;
