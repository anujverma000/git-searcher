import { Repository, User, Issue, Result } from "./@types/ResultTypes";

/**
 * Type for the data of the app
 *  - Users rearch results
 *  - Repository rearch results
 *  - Issue rearch results
 *  - searchQuery
 *  - searchType
 */
export interface State {
  users: User[];
  repositories: Repository[];
  issues: Issue[];
  searchQuery: string;
  searchType: string;
}

/**
 * Type for redux action
 */
interface Action {
  type: string;
  query: string;
  results: Result[];
  searchQuery: string;
  searchType: string;
}

/**
 * Initial state of the app with default empty query and default type as 'users'
 */
export const initialState: State = {
  users: new Array<User>(),
  repositories: new Array<Repository>(),
  issues: new Array<Issue>(),
  searchQuery: "",
  searchType: "users",
};

/**
 * Based of the action type updates the state of the app and triggers re-render in UI.
 *
 * @param state: State
 * @param action: Action
 */
const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "users":
      return {
        ...state,
        users: {
          ...state.users,
          [action.query]: action.results,
        },
      };
    case "repositories":
      return {
        ...state,
        repositories: {
          ...state.repositories,
          [action.query]: action.results,
        },
      };
    case "issues":
      return {
        ...state,
        issues: {
          ...state.issues,
          [action.query]: action.results,
        },
      };
    case "searchQuery":
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    case "searchType":
      return {
        ...state,
        searchType: action.searchType,
      };
    default:
      return state;
  }
};
export default reducer;
