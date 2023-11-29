import { Suspense } from 'react';
import db from '../../_data/db.json';
import UsersList from './UsersList';
import Loading from './loading';

const page = ({ searchParams }) => {
  const sortedUsers = db.users.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const page = searchParams.page || 1;
  const pageSize = searchParams.pageSize || 10;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const usersData = sortedUsers.slice(startIndex, endIndex);

  return (
    <Suspense fallback={<Loading />}>
      <UsersList usersData={usersData} />
    </Suspense>
  );
};

export default page;
