import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from '@mui/material';
import Link from 'next/link';
import db from '../../_data/db.json';

const Roles = () => {
  return (
    <Container>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        marginTop='50px'
        marginBottom='50px'
      >
        <Link href='/roles/create'>
          <Button
            variant='contained'
            color='primary'
            style={{ marginBottom: '20px' }}
          >
            Create Role
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
                <TableCell style={{ fontWeight: 'bold' }}>Role Name</TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>
                  Short Description
                </TableCell>
                <TableCell style={{ fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {db.roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>{role.roleName}</TableCell>
                  <TableCell>{role.shortDescription}</TableCell>
                  <TableCell>
                    <Link href={`/roles/${role.id}`}>
                      <Button
                        variant='outlined'
                        color='primary'
                        style={{ marginRight: '10px' }}
                      >
                        Update
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default Roles;
