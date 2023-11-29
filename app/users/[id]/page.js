import { Container } from '@mui/material';
import db from '../../../_data/db.json';
import { updateUser } from '@/app/actions';
import UpdateUser from './UpdateUser';

const page = async ({ params }) => {
  const userId = params.id;

  const userToUpdate = db.users.find((user) => user.id === parseInt(userId));

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UpdateUser userToUpdate={userToUpdate} userId={userId} db={db} />
    </Container>
  );
};

export default page;
