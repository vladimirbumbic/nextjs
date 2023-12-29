import { Suspense } from 'react';
import UsersList from './UsersList';
import Loading from './loading';
import { getUsers } from '../actions';

const page = async ({ searchParams }) => {
  const users = await getUsers();

  const sortedUsers = users.sort(
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
