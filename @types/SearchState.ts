/**
 * Type for Search State of the app.
 * It helps to manage corret type of inputs and save those for frequest visists.
 */
type SearchState = {
  searchType: string;
  searchQuery: string;
  saveSearchQuery: (query: string) => void;
  saveSearchType: (type: string) => void;
};

export default SearchState;
