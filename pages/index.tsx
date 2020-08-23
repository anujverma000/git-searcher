import { NextPage, NextPageContext } from 'next';
import { useSelector, useDispatch } from 'react-redux'
import { initializeStore } from '../store'
import Search from '../components/Search';
import UserCard from '../components/UserCard';

interface SearchProps {
  searchType: string,
  searchQuery: string,
  users: [],
  repositories: [],
  issues: []
}

const initialState: SearchProps = {
  searchType: 'users',
  searchQuery: '',
  users: [],
  repositories: [],
  issues: []
}

const useSearchState = () => {
  const searchType = useSelector((state: SearchProps) => state.searchType);
  const searchQuery = useSelector((state: SearchProps) => state.searchQuery);

  const dispatch = useDispatch();

  const saveSearchQuery = (query: string) =>
    dispatch({
      type: 'searchQuery', 
      searchQuery: query
    })

  const saveSearchType = (type: string) =>
    dispatch({
      type: 'searchType', 
      searchType: type
    })

  return { searchType, searchQuery, saveSearchQuery, saveSearchType }
}

const Home: NextPage<SearchProps> = () => {
  const searchState = useSearchState()
  return (
    <>
      <Search {...searchState} />
      <UserCard/>
    </>
  )
}

export async function getStaticProps(context: NextPageContext) {
  initializeStore(initialState)
  return {
    props: initialState,
  }
}

export default Home;