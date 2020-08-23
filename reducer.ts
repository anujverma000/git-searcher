export const initialState = {
  users: [],
  repositories: [],
  issues: [],
  searchQuery: '',
  searchType: 'users',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'users':
      return {
        ...state,
        users: {
          ...state.users,
          [action.query]: action.results,
        }
      }
    case 'repositories':
      return {
        ...state,
        repositories: {
          ...state.repositories,
          [action.query]: action.results,
        }
      }
    case 'issues':
      return {
        ...state,
        issues: {
          ...state.issues,
          [action.query]: action.results,
        }
      }
    case 'searchQuery': 
      return {
        ...state,
        searchQuery: action.searchQuery
      }
    case 'searchType': 
      return {
        ...state,
        searchType: action.searchType
      }
    default:
      return state
  }
  
}
export default reducer;