/**
 * Component for rendering users from search results
 */

import {
  PseudoBox,
  Avatar,
  Flex,
  Box,
  Link,
  Text,
  Button,
} from "@chakra-ui/core";
import { User } from "../@types/ResultTypes";

const UserCard: React.FC<User> = (user: User) => {
  return (
    <PseudoBox
      p={4}
      borderWidth="1px"
      rounded="lg"
      _hover={{ borderColor: "gray.400" }}
    >
      <Flex alignItems="center" justify="cenrer">
        <Box flex={1} minW="100px">
          <Avatar
            alignSelf="center"
            size="md"
            bg="white"
            name={user.name}
            src={user.avatar}
          />
          <Box mt={2}>
            <Link href={user.url}>
              <Button
                variantColor="gray"
                size="sm"
                variant="outline"
                fontWeight="normal"
              >
                Follow
              </Button>
            </Link>
          </Box>
        </Box>
        <Box flex={4} isTruncated>
          <Text fontSize={["sm", "md"]} color="#0366d6" fontWeight="semibold">
            {user.name}
          </Text>
          <Link
            href={user.url}
            isExternal
            color="gray.400"
            fontSize={["md", "sm"]}
          >
            {user.url}
          </Link>
          {/* <Box>
            <Button variantColor="gray" size="sm" variant="outline">
              Follow
            </Button>
          </Box> */}
        </Box>
      </Flex>
    </PseudoBox>
  );
};

export default UserCard;
