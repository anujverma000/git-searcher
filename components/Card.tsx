import {Box} from '@chakra-ui/core';

interface User {
  // : string
}
const Card:React.FC<User> = (user: User) => {
  return (
    <Box w="300px" p={5} ml={8} borderWidth="1px" rounded="md"> 
      
    </Box>
  )
}

export default Card;
