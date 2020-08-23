import {Link, Icon} from '@chakra-ui/core';
import Card from './Card';


interface User {
  // login: string
}
const UserCard:React.FC<User> = (user: User) => {
  return (
    <Card> 
      <Link href="https://github.com/user/anujverma000" isExternal color="blue.500" fontWeight="semibold">
        Anuj Verma <Icon name="external-link" mx="1px" /> anujverma000
      </Link>
    </Card>
  )
}

export default UserCard;
