import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Flex,
  Box,
  Text,
  Input,
  Select,
  Grid,
  Spinner,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/core";
import { GoMarkGithub } from "react-icons/go";
import { MdArrowDropDown } from "react-icons/md";
import useDebounce from "../lib/useDebounce";
import RepositoryCard from "./RepositoryCard";
import parseRepositories from "../lib/parseJsonToType";
import Repository from "../@types/Repository";

interface SearchState {
  searchType: string;
  searchQuery: string;
  saveSearchQuery: (query: string) => void;
  saveSearchType: (type: string) => void;
}
const useSearch = () => {
  const cachedResults = useSelector((state) => state);

  const dispatch = useDispatch();

  const search = (type: string, query: string, results) =>
    dispatch({
      type,
      query,
      results,
    });
  return { search, cachedResults };
};

const Search: React.FC<SearchState> = (searchState: SearchState) => {
  const [query, setQuery] = useState(searchState.searchQuery);
  const [type, setType] = useState(searchState.searchType);
  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState([]);

  const debouncedQuery = useDebounce(query);
  const debouncedType = useDebounce(type);

  const handleQueryChange = (queryString: string) => {
    setQuery(queryString);
    searchState.saveSearchQuery(queryString);
  };

  const handleTypeChange = (searchType: string) => {
    setType(searchType);
    searchState.saveSearchType(searchType);
  };
  const { cachedResults, search } = useSearch();
  useEffect(() => {
    setResults([]);
    const cachedType = cachedResults[debouncedType];
    const cached = cachedType && cachedType[debouncedQuery];
    if (cached) {
      setResults(cached);
    } else if (debouncedQuery?.length >= 3) {
      setLoading(true);
      fetch(`/api/search?t=${debouncedType}&q=${debouncedQuery}`)
        .then((res) => res.json())
        .then(({ items }) => {
          setResults(items);
          search(debouncedType, debouncedQuery, items);
          setLoading(false);
        });
    } else if (debouncedQuery?.length === 0) {
      setResults([]);
    }
  }, [debouncedQuery, debouncedType]);

  const renderRepos = () => {
    const repos: Repository[] = parseRepositories(results);
    return repos?.map((repo: Repository) => (
      <RepositoryCard key={repo.id} {...repo} />
    ));
  };
  return (
    <Stack direction="column" justify="center">
      <Box maxW="500px" mx="auto">
        <Flex align="top" mt={2}>
          <GoMarkGithub size="52px" />
          <Box ml={4}>
            <Text fontSize="xl" fontWeight="bold">
              Github Searcher
            </Text>
            <Text fontSize="md" color="gray.500">
              Search users, repositories or issues below
            </Text>
          </Box>
        </Flex>
        <Flex mt={2}>
          <InputGroup flex={2}>
            <Input
              placeholder="Start typing to search .."
              value={query}
              onChange={({ target }) => handleQueryChange(target.value)}
            />
            {loading && <InputRightElement children={<Spinner size="sm" />} />}
          </InputGroup>
          <Select
            flex={1}
            icon={MdArrowDropDown}
            ml={4}
            iconSize={8}
            value={type}
            onChange={({ target }) => handleTypeChange(target.value)}
          >
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
    </Stack>
  );
};

export default Search;
