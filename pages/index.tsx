import { NextPage, GetStaticProps } from "next";
import { useSelector, useDispatch } from "react-redux";
import { Repository, User, Issue } from "../@types/ResultTypes";
import { initializeStore } from "../store";
import Search from "../components/Search";
import Footer from "../components/Footer";

/**
 * Interface for SearchProps to Home page
 */
interface SearchProps {
  searchType: string;
  searchQuery: string;
  users: User[];
  repositories: Repository[];
  issues: Issue[];
}

/**
 * Initial state for the app
 */
const initialState: SearchProps = {
  searchType: "users",
  searchQuery: "",
  users: new Array<User>(),
  repositories: new Array<Repository>(),
  issues: new Array<Issue>(),
};

/**
 * Custom hook to access, save and persist app's state.
 */
const useSearchState = () => {
  const searchType = useSelector((state: SearchProps) => state.searchType);
  const searchQuery = useSelector((state: SearchProps) => state.searchQuery);

  const dispatch = useDispatch();

  const saveSearchQuery = (query: string) =>
    dispatch({
      type: "searchQuery",
      searchQuery: query,
    });

  const saveSearchType = (type: string) =>
    dispatch({
      type: "searchType",
      searchType: type,
    });

  return { searchType, searchQuery, saveSearchQuery, saveSearchType };
};

const Home: NextPage<SearchProps> = () => {
  const searchState = useSearchState();
  return (
    <>
      <Search {...searchState} />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  initializeStore(initialState);
  return {
    props: initialState,
  };
};

export default Home;
