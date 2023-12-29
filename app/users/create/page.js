import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { addUser, getRoles } from '@/app/actions';
import CreateButton from './CreateButton';

const CreateUser = async () => {
  const roles = await getRoles();

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
        action={addUser}
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
          label='First Name'
          name='firstName'
          defaultValue={''}
          fullWidth
          margin='dense'
          required
          inputProps={{
            pattern: '^[A-Za-z]{2,20}$',
            title:
              'required string, min length of 2 and max length of 20 characters.Only alphabetic characters allowed.',
          }}
        />
        <TextField
          label='Last Name'
          name='lastName'
          defaultValue={''}
          fullWidth
          margin='dense'
          required
          inputProps={{
            pattern: '^[A-Za-z]{2,20}$',
            title:
              'required string, min length of 2 and max length of 20 characters.Only alphabetic characters allowed.',
          }}
        />

        <TextField
          label='Email Address'
          name='email'
          defaultValue={''}
          fullWidth
          margin='dense'
          required
          inputProps={{
            pattern: '^[^s@]+@[^s@]+\\.[^s@]+$',
            title: 'Please enter a valid email address.',
          }}
        />
        <FormControl fullWidth margin='normal' required>
          <InputLabel id='roleNameLabel'>Role Name</InputLabel>
          <Select labelId='roleNameLabel' name='roleName' defaultValue={''}>
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.roleName}>
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <CreateButton />
      </form>
    </Container>
  );
};

export default CreateUser;
