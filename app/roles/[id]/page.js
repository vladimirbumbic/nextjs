import { Container } from '@mui/material';
import { editRole } from '@/app/actions';
import db from '../../../_data/db.json';
import UpdateRole from './UpdateRole';

const page = ({ params }) => {
  const roleId = params.id;

  const roleToUpdate = db.roles.find((r) => r.id.toString() === roleId);

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
