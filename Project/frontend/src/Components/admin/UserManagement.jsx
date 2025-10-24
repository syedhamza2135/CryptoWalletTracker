import { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Badge,
  Heading,
  Spinner,
  Center,
  useToast,
} from '@chakra-ui/react';
import { Trash2 } from 'lucide-react';
import { getUsers, deleteUser } from '../../api/admin';
import { formatDateTime } from '../../utils/formatters';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      toast({
        title: 'Failed to load users',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return;
    try {
      await deleteUser(id);
      setUsers(users.filter(u => u._id !== id));
      toast({
        title: 'User deleted',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Delete failed',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  if (loading) {
    return (
      <Center h="200px">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <Box>
      <Heading size="lg" mb={6}>User Management</Heading>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Status</Th>
              <Th>Last Login</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>
                  <Badge colorScheme={user.role === 'admin' ? 'purple' : 'blue'}>
                    {user.role}
                  </Badge>
                </Td>
                <Td>
                  <Badge colorScheme={user.isActive ? 'green' : 'red'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </Td>
                <Td fontSize="sm">{formatDateTime(user.lastLogin)}</Td>
                <Td>
                  <IconButton
                    icon={<Trash2 size={16} />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(user._id)}
                    aria-label="Delete user"
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}