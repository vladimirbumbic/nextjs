'use client';
import { Container, TextField } from '@mui/material';
import { editRole } from '@/app/actions';
import React, { startTransition, useOptimistic } from 'react';
import UpdateButton from './UpdateButton';

const UpdateRole = ({ roleToUpdate, roleId }) => {
  const [optimisticRole, setOptimisticRole] = useOptimistic(
    [roleToUpdate],
    (state, newRole) => [...state, newRole]
  );

  const handleFieldChange = (fieldName, value) => {
    startTransition(() => {
      setOptimisticRole({
        ...optimisticRole[optimisticRole.length - 1],
        [fieldName]: value,
      });
    });
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
          const roleName = formData.get('roleName');
          const shortDescription = formData.get('shortDescription');

          setOptimisticRole({ roleName, shortDescription });
          await editRole(formData, roleId);
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
          label='Role Name'
          name='roleName'
          fullWidth
          margin='dense'
          required
          defaultValue={
            optimisticRole[optimisticRole.length - 1]?.roleName || ''
          }
          onChange={(e) => handleFieldChange('roleName', e.target.value)}
        />
        <TextField
          label='Short Description'
          name='shortDescription'
          fullWidth
          margin='dense'
          defaultValue={
            optimisticRole[optimisticRole.length - 1]?.shortDescription || ''
          }
          onChange={(e) =>
            handleFieldChange('shortDescription', e.target.value)
          }
        />
        <UpdateButton />
      </form>
    </Container>
  );
};

export default UpdateRole;
