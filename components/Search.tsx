import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Flex, Box, Text, Image, Input, Select, Grid, Spinner, InputGroup, InputRightElement } from '@chakra-ui/core';
import { MdArrowDropDown } from 'react-icons/md';
import useDebounce from '../lib/useDebounce';
import RepositoryCard from './RepositoryCard';

interface SearchState {
  searchType: string,
  searchQuery: string,
  saveSearchQuery: Function,
  saveSearchType:Function
}
const useSearch = () => {
  const cachedResults = useSelector((state) => state);

  const dispatch = useDispatch();

  const search = (type, query, results) =>
    dispatch({
      type, query, results
    })
  return { search, cachedResults }
}

const Search:React.FC<SearchState> = (searchState: SearchState) => {
  const [query, setQuery] = useState(searchState.searchQuery);
  const [type, setType] = useState(searchState.searchType);
  const [loading, setLoading] = useState(false);
  
  const [results, setResults] = useState([]);

  const debouncedQuery = useDebounce(query);
  const debouncedType = useDebounce(type);

  const handleQueryChange= (query: string) => {
    setQuery(query);
    searchState.saveSearchQuery(query);
  }

  const handleTypeChange= (type: string) => {
    setType(type);
    searchState.saveSearchType(type);
  }
  const { cachedResults, search }  = useSearch()
  useEffect(() => {
    setResults([]);
    let cachedType = cachedResults[debouncedType]
    let cached = cachedType && cachedType[debouncedQuery]
    if(cached){
      setResults(cached)
    }else if(debouncedQuery?.length >= 3){
      setLoading(true);
      fetch(`/api/search?t=${debouncedType}&q=${debouncedQuery}`)
      .then(res => res.json())
      .then(results => {
        setResults(results)
        search(debouncedType, debouncedQuery, results);
        setLoading(false);
      });
    }else if(debouncedQuery?.length === 0){
      setResults([]);
    }
  }, [debouncedQuery, debouncedType])
 
  const renderRepos = () => {
    return (
      results?.items?.map((repo) => <RepositoryCard key={repo.id} repo={repo} /> )
    )
  }
  return (
    <>
      <Box maxW="500px" mx="auto">
        <Flex align="top" mt={2}>
          <Image size="52px" alt="github logo" src="github-logo.png"/>
          <Box ml={4}>
            <Text fontSize="xl" fontWeight="bold">Github Searcher</Text>
            <Text fontSize="md" color="gray.500">Search users, repositories or issues below</Text>
          </Box>
        </Flex>
        <Flex mt={2}>
          <InputGroup flex={2}>
            <Input placeholder="Start typing to search .." value={query} onChange={({target}) => handleQueryChange(target.value)}/>
            {loading && <InputRightElement children={<Spinner size="sm" />} /> }
          </InputGroup>
          <Select flex={1} icon={MdArrowDropDown} ml={4} iconSize={8} value={type} onChange={({target}) => handleTypeChange(target.value)}>
            <option value="users">Users</option>
            <option value="repositories">Repositories</option>
            <option value="issues">Issues</option>
          </Select>
        </Flex>
          
      </Box>
      <Box maxW="900px" mx="auto" mt={4}>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          {renderRepos()}
        </Grid>
      </Box>
    </>
  )
}

export default Search
