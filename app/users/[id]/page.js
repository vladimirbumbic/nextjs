import { Container } from '@mui/material';
import UpdateUser from './UpdateUser';
import { getUsers } from '@/app/actions';

const page = async ({ params }) => {
  const userId = params.id;

  const users = await getUsers();
  const userToUpdate = users.find((user) => user.id === parseInt(userId));

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UpdateUser userToUpdate={userToUpdate} userId={userId} />
    </Container>
  );
};

export default page;
