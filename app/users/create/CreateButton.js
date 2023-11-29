'use client';
import { Button } from '@mui/material';
import { useFormStatus } from 'react-dom';

const CreateButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type='submit'
      variant='contained'
      color='primary'
      style={{ marginTop: '20px' }}
    >
      {pending ? 'Creating...' : 'Create User'}
    </Button>
  );
};

export default CreateButton;
