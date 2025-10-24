import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { getAnalytics } from '../../api/admin';

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await getAnalytics();
        setAnalytics(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <Center h="200px">
        <Spinner size="xl" color="blue.500" />
      </Center>
    );
  }

  return (
    <Box>
      <Heading size="lg" mb={6}>Search Analytics</Heading>
      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Email</Th>
              <Th>Total Searches</Th>
              <Th>Success Rate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {analytics?.userSearchStats?.map((stat) => (
              <Tr key={stat._id}>
                <Td>{stat.userName}</Td>
                <Td>{stat.userEmail}</Td>
                <Td>{stat.totalSearches}</Td>
                <Td>{stat.successRate}%</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}