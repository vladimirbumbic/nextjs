'use client';
import { Button } from '@mui/material';
import { useFormStatus } from 'react-dom';

const UpdateButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type='submit'
      variant='contained'
      color='primary'
      style={{ marginTop: '20px' }}
    >
      {pending ? 'Updating...' : 'Update Role'}
    </Button>
  );
};

export default UpdateButton;
