'use client';
import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { startTransition, useEffect, useOptimistic, useState } from 'react';
import UpdateButton from './UpdateButton';
import { getRoles, updateUser } from '@/app/actions';

const UserPage = ({ userId, userToUpdate }) => {
  const [roles, setRoles] = useState([]);

  const [optimisticUser, setOptimisticUser] = useOptimistic(
    [userToUpdate],
    (state, newUser) => [...state, newUser]
  );

  useEffect(() => {
    const fetchRoles = async () => {
      const fetchedRoles = await getRoles();
      setRoles(fetchedRoles);
    };

    fetchRoles();
  }, []);

  const handleFieldChange = (fieldName, value) => {
    startTransition(() => {
      setOptimisticUser({
        ...optimisticUser[optimisticUser.length - 1],
        [fieldName]: value,
      });
    });
  };

  const [roleName, setRoleName] = useState(
    optimisticUser[optimisticUser.length - 1]?.roleName || ''
  );

  const handleRoleNameChange = (e) => {
    const selectedRoleName = e.target.value;
    setRoleName(selectedRoleName);
    handleFieldChange('roleName', selectedRoleName);
  };

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
        action={async (formData) => {
          const firstName = formData.get('firstName');
          const lastName = formData.get('lastName');
          const email = formData.get('email');
          const roleName = formData.get('roleName');

          setOptimisticUser({ firstName, lastName, email, roleName });
          await updateUser(formData, userId);
        }}
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
          fullWidth
          margin='dense'
          required
          defaultValue={
            optimisticUser[optimisticUser.length - 1]?.firstName || ''
          }
          onChange={(e) => handleFieldChange('firstName', e.target.value)}
          inputProps={{
            pattern: '^[A-Za-z]{2,20}$',
            title:
              'Required string, min length of 2 and max length of 20 characters. Only alphabetic characters allowed.',
          }}
        />
        <TextField
          label='Last Name'
          name='lastName'
          fullWidth
          margin='dense'
          required
          defaultValue={
            optimisticUser[optimisticUser.length - 1]?.lastName || ''
          }
          onChange={(e) => handleFieldChange('lastName', e.target.value)}
          inputProps={{
            pattern: '^[A-Za-z]{2,20}$',
            title:
              'Required string, min length of 2 and max length of 20 characters. Only alphabetic characters allowed.',
          }}
        />
        <TextField
          label='Email Address'
          name='email'
          fullWidth
          margin='dense'
          required
          defaultValue={optimisticUser[optimisticUser.length - 1]?.email || ''}
          onChange={(e) => handleFieldChange('email', e.target.value)}
          inputProps={{
            pattern: '^[^s@]+@[^s@]+\\.[^s@]+$',
            title: 'Please enter a valid email address.',
          }}
        />
        <FormControl fullWidth margin='normal' required>
          <InputLabel id='roleNameLabel'>Role Name</InputLabel>
          <Select
            labelId='roleNameLabel'
            name='roleName'
            value={roleName}
            onChange={handleRoleNameChange}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.roleName}>
                {role.roleName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <UpdateButton />
      </form>
    </Container>
  );
};

export default UserPage;
