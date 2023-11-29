'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import db from '../../_data/db.json';
import { Button } from '@mui/material';

const PaginationControls = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get('page') || 1;
  const pageSize = searchParams.get('pageSize') || 10;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button
        onClick={() =>
          router.push(`?page=${Number(page) - 1}&pageSize=${pageSize}`)
        }
        disabled={page === 1}
        style={{ marginRight: '10px' }}
      >
        Previous
      </Button>

      <div>
        {page}/ {Math.ceil(db.users.length / Number(pageSize))}
      </div>
      <Button
        onClick={() =>
          router.push(`?page=${Number(page) + 1}&pageSize=${pageSize}`)
        }
        style={{ marginLeft: '10px' }}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationControls;
