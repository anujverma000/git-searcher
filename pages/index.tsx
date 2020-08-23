import {useState, useEffect} from 'react';
import { NextPage, NextPageContext } from 'next';
import Cookie from 'js-cookie';
import { parseCookies } from '../lib/parseCookies';
import Search from '../components/Search';
import UserCard from '../components/UserCard';

interface SearchProps {
  searchType: string,
  searchQuery: string,
}

const initialState: SearchProps = {
  searchType: 'users',
  searchQuery: '',
}

const Home: NextPage<SearchProps> = (state) => {
  const [searchState, setSearchState] = useState(state);
  
  useEffect(() => {
    Cookie.set('searchState', JSON.stringify(searchState));
  }, [searchState]);

  return (
    <>
      <Search state={searchState} setState={setSearchState}/>
      <UserCard/>
    </>
  )
}

Home.getInitialProps = async (context: NextPageContext) => {
  const cookies = parseCookies(context);
  console.log(cookies.searchState)
  return cookies.searchState? JSON.parse(cookies.searchState) : initialState;
}

export default Home;