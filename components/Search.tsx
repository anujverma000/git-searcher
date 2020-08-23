import {useState, useEffect} from 'react';
import { Flex, Box, Text, Image, Input, Select } from '@chakra-ui/core';
import { MdArrowDropDown } from 'react-icons/md';
import useDebounce from '../lib/useDebounce';

interface Props {
  state: {
    searchType: string,
    searchQuery: string,
  }
  setState: Function
}

const Search:React.FC<Props> = ({state, setState}) => {
  const [query, setQuery] = useState(state.searchQuery);
  const [type, setType] = useState(state.searchType);
  
  const [results, setResults] = useState([]);

  const debouncedQuery = useDebounce(query);
  const debouncedType = useDebounce(type);

  const handleQueryChange= (query: string) => {
    setQuery(query);
    setState({searchType: type, searchQuery: query});
  }

  const handleTypeChange= (type: string) => {
    setType(type);
    setState({searchType: type, searchQuery: query});
  }
  
  useEffect(() => {
    if(debouncedQuery && debouncedQuery.length >= 3){
      fetch(`/api/search?t=${type}&q=${debouncedQuery}`)
      .then(res => res.json())
      .then(results => {
        console.log(results);
        setResults(results)
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
    </Box>
  )
}

export default Search
