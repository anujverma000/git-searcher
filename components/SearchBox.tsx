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

const SearchBox = ({
  query,
  handleQueryChange,
  type,
  handleTypeChange,
  loading,
}) => {
  return (
    <Box w="500px" mx="auto" mt={20}>
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
  );
};

export default SearchBox;
