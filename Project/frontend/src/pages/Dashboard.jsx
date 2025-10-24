import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { useAuth } from '../hooks/useAuth';
import { formatDateTime } from '../utils/formatters';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Container maxW="container.xl" py={8}>
      <VStack align="start" spacing={6}>
        <Box>
          <Heading size="xl" mb={2}>Welcome, {user?.name}!</Heading>
          <Text color="gray.600">
            Last login: {formatDateTime(user?.lastLogin)}
          </Text>
        </Box>

        <Box p={6} borderWidth={1} borderRadius="lg" width="full">
          <Heading size="md" mb={4}>Quick Stats</Heading>
          <VStack align="start" spacing={2}>
            <Text>Email: {user?.email}</Text>
            <Text>Role: {user?.role}</Text>
            <Text>Status: {user?.isActive ? 'Active' : 'Inactive'}</Text>
          </VStack>
        </Box>

        <Box p={6} bg="blue.50" borderRadius="lg" width="full">
          <Heading size="md" mb={2}>Getting Started</Heading>
          <Text>
            Use the navigation to search for Bitcoin wallets and view your search history.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}