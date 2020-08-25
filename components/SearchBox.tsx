/**
 * Component for the Search box which includes
 * github icon, title, subtitle, query input and type selector
 */

import {
  Flex,
  Box,
  Text,
  Input,
  Select,
  Spinner,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/core";
import { GoMarkGithub } from "react-icons/go";
import { MdArrowDropDown } from "react-icons/md";

type SearchBoxType = {
  query: string;
  handleQueryChange: (query: string) => void;
  type: string;
  handleTypeChange: (query: string) => void;
  loading: boolean;
};

const SearchBox: React.FC<SearchBoxType> = (searchState: SearchBoxType) => {
  return (
    <Box w="100%" maxW="500px" mx="auto" px={2}>
      <Flex align="top" mt={[6, 2]}>
        <GoMarkGithub size="52px" />
        <Box ml={4}>
          <Text fontSize="xl" fontWeight="bold">
            Github Searcher
          </Text>
          <Text fontSize={["sm", "md"]} color="gray.500">
            Search users, repositories or issues below
          </Text>
        </Box>
      </Flex>
      <Flex mt={2}>
        <InputGroup flex={2}>
          <Input
            placeholder="Start typing to search .."
            value={searchState.query}
            onChange={({ target }) =>
              searchState.handleQueryChange(target.value)
            }
          />
          {searchState.loading && (
            <InputRightElement children={<Spinner size="sm" />} />
          )}
        </InputGroup>
        <Select
          flex={[2, 1]}
          icon={MdArrowDropDown}
          ml={2}
          iconSize={8}
          value={searchState.type}
          fontSize={["sm", "md"]}
          onChange={({ target }) => searchState.handleTypeChange(target.value)}
        >
          <option value="users">Users</option>
          <option value="repositories">Repositories</option>
          <option value="issues">Issues</option>
        </Select>
      </Flex>
    </Box>
  );
};

export default SearchBox;
