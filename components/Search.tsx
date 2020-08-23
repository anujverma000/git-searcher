import {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Flex, Box, Text, Image, Input, Select } from '@chakra-ui/core';
import { MdArrowDropDown } from 'react-icons/md';
import useDebounce from '../lib/useDebounce';

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
  
  const [results, setResults] = useState();

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
    let cachedType = cachedResults[debouncedType]
    let cached = cachedType && cachedType[debouncedQuery]
    if(cached){
      setResults(cached)
    }else if(debouncedQuery && debouncedQuery.length >= 3){
      fetch(`/api/search?t=${debouncedType}&q=${debouncedQuery}`)
      .then(res => res.json())
      .then(results => {
        setResults(results)
        search(debouncedType, debouncedQuery, results);
      });
    }
  }, [debouncedQuery, debouncedType])
 
  
  return (
    <Box maxW="500px" mx="auto">
      <Flex align="top" mt={2}>
        <Image size="52px" alt="github logo" src="github-logo.png"/>
        <Box ml={4}>
          <Text fontSize="xl" fontWeight="bold">Github Searcher</Text>
          <Text fontSize="md" color="gray.500">Search users, repositories or issues below</Text>
        </Box>
      </Flex>
      <Flex mt={2}>
        <Input flex={2} placeholder="Start typing to search .." mr={4} value={query} onChange={({target}) => handleQueryChange(target.value)}/>
        <Select flex={1} icon={MdArrowDropDown} iconSize={8} value={type} onChange={({target}) => handleTypeChange(target.value)}>
          <option value="users">Users</option>
          <option value="repositories">Repositories</option>
          <option value="issues">Issues</option>
        </Select>
      </Flex>
        {debouncedType} : {debouncedQuery}
    </Box>
  )
}

export default Search
