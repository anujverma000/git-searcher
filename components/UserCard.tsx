import {Box, Link, Icon} from '@chakra-ui/core';
interface User {
  // login: string
}
const UserCard:React.FC<User> = (user: User) => {
  return (
    <Box w="300px" p={5} ml={8} borderWidth="1px" rounded="md"> 
      <Link href="https://github.com/user/anujverma000" isExternal color="blue.500" fontWeight="semibold">
        Anuj Verma <Icon name="external-link" mx="1px" /> anujverma000
      </Link>
    </Box>
  )
}

export default UserCard;
