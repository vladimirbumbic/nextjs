'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { getUsers } from '../actions';

const PaginationControls = () => {
  const [users, setUsers] = useState([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    };

    fetchUsers();
  }, []);

  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`?page=${newPage}&pageSize=${pageSize}`);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        onClick={() => goToPage(page - 1)}
        disabled={page === 1}
        style={{ marginRight: '10px' }}
      >
        Previous
      </Button>

      <div>
        {page}/ {totalPages}
      </div>
      <Button
        onClick={() => goToPage(page + 1)}
        disabled={page === totalPages}
        style={{ marginLeft: '10px' }}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
