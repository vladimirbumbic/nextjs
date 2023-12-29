import { Container } from '@mui/material';
import { getRoles } from '@/app/actions';
import UpdateRole from './UpdateRole';

const page = async ({ params }) => {
  const roleId = params.id;

  const roles = await getRoles();
  const roleToUpdate = roles.find((r) => r.id.toString() === roleId);

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <UpdateRole roleToUpdate={roleToUpdate} roleId={roleId} />
    </Container>
  );
};

export default page;
