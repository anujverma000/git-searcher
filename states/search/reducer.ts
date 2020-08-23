import {SEARCH_ACTION, ISearch}from './actions';

const initialState: ISearch = {
  query: '',
  type: 'users',
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ACTION:
      return Object.assign({}, state, { message: action.message })
    default: return state
  }
}