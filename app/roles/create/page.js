import { Container, TextField } from '@mui/material';
import { addRole } from '@/app/actions';
import CreateButton from './CreateButton';

const CreateRole = () => {
  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <form
        action={addRole}
        style={{
          marginTop: '20px',
          padding: '20px',
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          label='Role Name'
          name='roleName'
          defaultValue={''}
          fullWidth
          margin='dense'
          required
          inputProps={{
            pattern: '^[a-zA-Z0-9_]{2,16}$',
            title:
              'required alphanumeric value that can contain underscore (_) with min length of 2, max length of 16 characters.',
          }}
        />

        <TextField
          label='Short Description'
          name='shortDescription'
          defaultValue={''}
          fullWidth
          margin='dense'
          inputProps={{
            pattern: '^[a-zA-Z]{2,50}$',
            title: 'string, min length of 2, max length of 50 characters.',
          }}
        />
        <CreateButton />
      </form>
    </Container>
  );
};

export default CreateRole;
