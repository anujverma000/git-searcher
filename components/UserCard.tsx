/**
 * Component for rendering users from search results
 */

import { PseudoBox, Avatar, Flex, Box, Link, Text } from "@chakra-ui/core";
import { User } from "../@types/ResultTypes";

const UserCard: React.FC<User> = (user: User) => {
  return (
    <PseudoBox
      p={4}
      borderWidth="1px"
      rounded="lg"
      _hover={{ borderColor: "gray.400" }}
    >
      <Flex>
        <Box w="100px">
          <Avatar
            alignSelf="center"
            size="md"
            bg="white"
            name={user.name}
            src={user.avatar}
          />
        </Box>
        <Box flexGrow={1}>
          <Link href={user.url} isExternal color="#0366d6">
            <Text fontSize="md" ml={2} fontWeight="semibold">
              {user.name}
            </Text>
          </Link>
        </Box>
      </Flex>
    </PseudoBox>
  );
};

export default UserCard;
