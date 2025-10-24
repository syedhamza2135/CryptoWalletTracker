import { useState, useEffect } from 'react';
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { getStats } from '../../api/admin';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        setStats(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
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
      <Heading size="lg" mb={6}>Admin Dashboard</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Stat p={4} borderWidth={1} borderRadius="lg">
          <StatLabel>Total Users</StatLabel>
          <StatNumber>{stats?.totalUsers || 0}</StatNumber>
          <StatHelpText>Active: {stats?.activeUsers || 0}</StatHelpText>
        </Stat>

        <Stat p={4} borderWidth={1} borderRadius="lg">
          <StatLabel>Total Searches</StatLabel>
          <StatNumber>{stats?.totalSearches || 0}</StatNumber>
        </Stat>

        <Stat p={4} borderWidth={1} borderRadius="lg">
          <StatLabel>Searches Today</StatLabel>
          <StatNumber>{stats?.searchesToday || 0}</StatNumber>
        </Stat>

        <Stat p={4} borderWidth={1} borderRadius="lg">
          <StatLabel>Admin Users</StatLabel>
          <StatNumber>{stats?.adminUsers || 0}</StatNumber>
        </Stat>
      </SimpleGrid>
    </Box>
  );
}