export const SEARCH_ACTION = 'SEARCH'

export interface ISearch {
  query: string,
  type: string
}


export const performSearch = (params: ISearch) => dispatch => {
  return dispatch({ type: SEARCH_ACTION, params })
}