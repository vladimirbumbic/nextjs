import {
  Container,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import Link from 'next/link';
import PaginationControls from '../components/PaginationControls';

const UsersList = ({ usersData }) => {
  return (
    <Container>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        marginTop='50px'
        marginBottom='50px'
      >
        <Link href='/users/create'>
          <Button
            variant='contained'
            color='primary'
            style={{ marginBottom: '20px' }}
          >
            Create User
          </Button>
        </Link>

        <TableContainer
          component={Paper}
          style={{
            maxWidth: '600px',
            margin: '20px auto',
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold' }}>First Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Last Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Role Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {usersData.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.roleName}</TableCell>
                  <TableCell>
                    <Link href={`/users/${user.id}`}>
                      <Button variant='outlined' color='primary'>
                        Update
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box mt={2} display='flex' justifyContent='center'>
            <PaginationControls />
          </Box>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default UsersList;
