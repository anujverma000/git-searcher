import { useSelector, useDispatch } from "react-redux";

/**
 * Custom hook to
 *  - access the cached results
 *  - fire redux actions and save the query, type and search results
 */
const useSearch = () => {
  const cachedResults = useSelector((state) => state);
  const dispatch = useDispatch();

  const saveSearch = (type: string, query: string, results) =>
    dispatch({
      type,
      query,
      results,
    });
  return { saveSearch, cachedResults };
};

export default useSearch;
