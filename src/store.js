import { createStore } from "redux";

const blankState = {
  tags: [],
  terms: [],
  results: [],
  error: false,
};

const actions = function (state, action) {
  if (state === undefined) {
    return blankState;
  }
  var updated = state;
  switch (action.type) {
    case "add_term":
      var newTerms = [...state.terms, action.term];
      updated = { ...state, terms: newTerms };
      break;
    case "add_tag":
      var newTags = [...state.tags, action.tag];
      updated = { ...state, tags: newTags };
      break;
    case "search":
      updated = { ...state, results: action.results.hits };
      break;
    default:
      break;
  }
  return updated;
};

const store = createStore(actions, blankState);
export default store;
