/**
 * Search Component renders the search box and resutls
 */

import { useState, useEffect } from "react";
import { Grid, Stack, useToast } from "@chakra-ui/core";
import useDebounce from "../lib/useDebounce";
import RepositoryCard from "./RepositoryCard";
import UserCard from "./UserCard";
import IssueCard from "./IssueCard";
import { parseRepositories, parseUsers, parseIssues } from "../lib/parseTypes";
import { Repository, User, Issue, Result } from "../@types/ResultTypes";
import SearchState from "../@types/SearchState";
import useSearch from "../lib/useSearch";
import SearchBox from "./SearchBox";

const Search: React.FC<SearchState> = (searchState: SearchState) => {
  /**
   * Debounce Time out
   */
  const DEFAULT_DEBOUNCE_TIMEOUT = 500;
  /**
   * For controlled Input of the search query string
   */
  const [query, setQuery] = useState<string>(searchState.searchQuery);

  /**
   * For controlled Input of the search type
   */
  const [type, setType] = useState<string>(searchState.searchType);

  /**
   * Use debounce for the search query
   */
  const debouncedQuery = useDebounce<string>(query, DEFAULT_DEBOUNCE_TIMEOUT);

  /**
   * Use debounce for the search type as well
   */
  const debouncedType = useDebounce<string>(type, DEFAULT_DEBOUNCE_TIMEOUT);

  /**
   * Use to show loading for new search keywords
   */
  const [loading, setLoading] = useState<boolean>(false);

  /**
   * Holds the results of the search
   */
  const [results, setResults] = useState<Result[]>([]);

  /**
   * UI hook to show the toast message when server request fails.
   */
  const toast = useToast();

  /**
   * Set the query of the controllerd input and
   * save the query in persitent store
   */
  const handleQueryChange = (queryString: string) => {
    setQuery(queryString);
    searchState.saveSearchQuery(queryString);
  };

  /**
   * Set the search type of the controllerd input and
   * save the type in persitent store as well
   */
  const handleTypeChange = (searchType: string) => {
    setType(searchType);
    searchState.saveSearchType(searchType);
  };

  /**
   * Hook to get the cached results from persistent stroe and
   * a handler to save the results for the new searches.
   */
  const { cachedResults, saveSearch } = useSearch();

  /**
   * Parse the results based on the type of search
   * Also parsed results are saved in persistent store, not all the big jsons github returns
   */
  const parseResults = (searchType: string, items): Result[] => {
    let parsedresults: Result[];

    if (searchType === "repositories") {
      parsedresults = parseRepositories(items);
    }
    if (searchType === "users") {
      parsedresults = parseUsers(items);
    }
    if (searchType === "issues") {
      parsedresults = parseIssues(items);
    }
    return parsedresults;
  };

  /**
   * Handles the API request with backend and sets the result on store.
   */
  const handleSearchRequest = () => {
    fetch(
      `/api/search?t=${encodeURI(debouncedType)}&q=${encodeURI(debouncedQuery)}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(({ items }) => {
        /* Get the parsed results, save them in persistent store and set loading off */
        const parsedResults = parseResults(debouncedType, items);
        setResults(parsedResults);
        saveSearch(debouncedType, debouncedQuery, parsedResults);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast({
          title: "An error occurred.",
          description: error.message,
          position: "top",
          status: "error",
          duration: 10000,
          isClosable: true,
        });
      });
  };

  /**
   * Look for debouncedQuery, debouncedType change events and
   * Update results either from persitent cache or API hit.
   */
  useEffect(() => {
    /* Get the cahched Type */
    const cachedType = cachedResults[debouncedType];

    /* Get the cahched results based on the type changed */
    const cached = cachedType && cachedType[debouncedQuery];

    /* Set the new results when type is changed or query is updated */
    if (cached) {
      setResults(cached);
    } else if (debouncedQuery?.length >= 3) {
      /* Set the loading and hit the api */
      setLoading(true);
      handleSearchRequest();
    } else if (debouncedQuery?.length === 0) {
      /* If query is empty clear the results */
      setResults([]);
    }
  }, [debouncedQuery, debouncedType]);

  /**
   * Renders the search results based on type selected
   * This helps us to render different UI formats for different types as well
   */
  const renderResults = (searchType: string) => {
    if (searchType === "repositories") {
      return (
        <Grid
          w={["95%", "70%"]}
          mx="auto"
          my={20}
          templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
          gap={4}
        >
          {results?.map((repo: Repository) => (
            <RepositoryCard key={repo.id} {...repo} />
          ))}
        </Grid>
      );
    }
    if (searchType === "users") {
      return (
        <Grid
          w={["95%", "70%"]}
          mx="auto"
          my={20}
          templateColumns="repeat(auto-fill, minmax(320px, 1fr))"
          gap={4}
        >
          {results?.map((user: User) => (
            <UserCard key={user.id} {...user} />
          ))}
        </Grid>
      );
    }
    if (searchType === "issues") {
      return (
        <Grid w={["95%", "70%"]} mx="auto" my={20}>
          {results?.map((issue: Issue) => (
            <IssueCard key={issue.id} {...issue} />
          ))}
        </Grid>
      );
    }
    return null;
  };

  return (
    <Stack direction="column" justify="center" minH="85vh">
      <SearchBox
        {...{ query, type, handleQueryChange, handleTypeChange, loading }}
      />
      {renderResults(debouncedType)}
    </Stack>
  );
};

export default Search;
