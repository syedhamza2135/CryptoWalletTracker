import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Stat as ChakraStat,
  Card,
  CardBody,
  CardHeader,
  Button,
  Icon,
  Divider,
  Badge,
  Avatar,
  Flex,
  Spacer,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  Search,
  History,
  TrendingUp,
  Wallet,
  Clock,
  User,
  BarChart3,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useHistory } from '../hooks/useHistory';
import { formatDateTime, truncateAddress, formatBTC } from '../utils/formatters';

export default function Dashboard() {
  const { user } = useAuth();
  const { history, loading: historyLoading } = useHistory();

  console.log('Dashboard user:', user);

  // Calculate dashboard stats
  const totalSearches = history.length;
  const recentSearches = history.slice(0, 5);
  const lastSearch = history[0];
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Container maxW="container.xl" py={8}>
      <VStack align="stretch" spacing={8}>
        {/* Welcome Header */}
        <Card bg={cardBg} shadow="md">
          <CardBody>
            <Flex align="center" justify="space-between">
              <HStack spacing={4}>
                <Avatar
                  size="lg"
                  name={user?.name}
                  bg="blue.500"
                  color="white"
                />
                <Box>
                  <Heading size="xl" mb={1}>
                    Welcome back, {user?.name}!
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Last login: {formatDateTime(user?.lastLogin)}
                  </Text>
                  <HStack mt={2}>
                    <Badge colorScheme="green" variant="subtle">
                      {user?.role}
                    </Badge>
                    <Badge colorScheme={user?.isActive ? 'blue' : 'red'} variant="subtle">
                      {user?.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </HStack>
                </Box>
              </HStack>
              <Box textAlign="right">
                <Text fontSize="sm" color="gray.500">Member since</Text>
                <Text fontWeight="semibold">
                  {formatDateTime(user?.createdAt)}
                </Text>
              </Box>
            </Flex>
          </CardBody>
        </Card>

        {/* Quick Stats */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <Card bg={cardBg} shadow="md">
            <CardBody>
              <ChakraStat>
                <StatLabel>
                  <HStack>
                    <Icon as={Search} />
                    <Text>Total Searches</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>{totalSearches}</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  Lifetime searches
                </StatHelpText>
              </ChakraStat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="md">
            <CardBody>
              <ChakraStat>
                <StatLabel>
                  <HStack>
                    <Icon as={History} />
                    <Text>Recent Activity</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>
                  {lastSearch ? formatDateTime(lastSearch.searchDate).split(',')[0] : 'No searches'}
                </StatNumber>
                <StatHelpText>
                  Last search performed
                </StatHelpText>
              </ChakraStat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="md">
            <CardBody>
              <ChakraStat>
                <StatLabel>
                  <HStack>
                    <Icon as={Wallet} />
                    <Text>Wallets Analyzed</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>{totalSearches}</StatNumber>
                <StatHelpText>
                  Unique wallet addresses
                </StatHelpText>
              </ChakraStat>
            </CardBody>
          </Card>

          <Card bg={cardBg} shadow="md">
            <CardBody>
              <ChakraStat>
                <StatLabel>
                  <HStack>
                    <Icon as={TrendingUp} />
                    <Text>Account Status</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>
                  <Badge colorScheme="green" fontSize="md" px={2} py={1}>
                    Active
                  </Badge>
                </StatNumber>
                <StatHelpText>
                  Ready to search
                </StatHelpText>
              </ChakraStat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Quick Actions */}
        <Card bg={cardBg} shadow="md">
          <CardHeader>
            <Heading size="md">
              <HStack>
                <Icon as={Zap} />
                <Text>Quick Actions</Text>
              </HStack>
            </Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
              <Button
                as={Link}
                to="/wallet-search"
                colorScheme="blue"
                size="lg"
                height="auto"
                p={4}
                variant="outline"
                _hover={{ shadow: 'md' }}
              >
                <VStack spacing={2}>
                  <Icon as={Search} size={24} />
                  <Text fontSize="sm">Search Wallet</Text>
                </VStack>
              </Button>

              <Button
                as={Link}
                to="/history"
                colorScheme="green"
                size="lg"
                height="auto"
                p={4}
                variant="outline"
                _hover={{ shadow: 'md' }}
              >
                <VStack spacing={2}>
                  <Icon as={History} size={24} />
                  <Text fontSize="sm">View History</Text>
                </VStack>
              </Button>

              <Button
                as={Link}
                to="/profile"
                colorScheme="purple"
                size="lg"
                height="auto"
                p={4}
                variant="outline"
                _hover={{ shadow: 'md' }}
              >
                <VStack spacing={2}>
                  <Icon as={User} size={24} />
                  <Text fontSize="sm">Edit Profile</Text>
                </VStack>
              </Button>

              <Button
                as={Link}
                to="/admin"
                colorScheme="orange"
                size="lg"
                height="auto"
                p={4}
                variant="outline"
                _hover={{ shadow: 'md' }}
                isDisabled={user?.role !== 'admin'}
              >
                <VStack spacing={2}>
                  <Icon as={BarChart3} size={24} />
                  <Text fontSize="sm">Admin Panel</Text>
                </VStack>
              </Button>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Recent Searches */}
        <Card bg={cardBg} shadow="md">
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="md">
                <HStack>
                  <Icon as={Clock} />
                  <Text>Recent Searches</Text>
                </HStack>
              </Heading>
              <Button as={Link} to="/history" size="sm" colorScheme="blue" variant="ghost">
                View All
              </Button>
            </Flex>
          </CardHeader>
          <CardBody>
            {historyLoading ? (
              <Text color="gray.500">Loading recent searches...</Text>
            ) : recentSearches.length > 0 ? (
              <VStack align="stretch" spacing={3}>
                {recentSearches.map((search, index) => (
                  <Box key={search._id}>
                    <Flex justify="space-between" align="center">
                      <HStack spacing={3}>
                        <Badge colorScheme="blue" variant="subtle">
                          {index + 1}
                        </Badge>
                        <Box>
                          <Text fontFamily="mono" fontSize="sm">
                            {truncateAddress(search.walletAddress)}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {formatDateTime(search.searchDate)}
                          </Text>
                        </Box>
                      </HStack>
                      <HStack spacing={2}>
                        <Text fontSize="sm" fontWeight="semibold">
                          {formatBTC(search.balance)}
                        </Text>
                        <Badge colorScheme={search.status === 'success' ? 'green' : 'red'} variant="subtle">
                          {search.status}
                        </Badge>
                      </HStack>
                    </Flex>
                    {index < recentSearches.length - 1 && <Divider mt={3} />}
                  </Box>
                ))}
              </VStack>
            ) : (
              <Box textAlign="center" py={8}>
                <Icon as={Search} size={48} color="gray.300" mb={4} />
                <Text color="gray.500" mb={4}>
                  No searches yet. Start by searching for a Bitcoin wallet!
                </Text>
                <Button as={Link} to="/wallet-search" colorScheme="blue">
                  Search Your First Wallet
                </Button>
              </Box>
            )}
          </CardBody>
        </Card>

        {/* Getting Started Guide */}
        {totalSearches === 0 && (
          <Card bg="blue.50" borderColor="blue.200" shadow="md">
            <CardBody>
              <VStack align="start" spacing={4}>
                <Heading size="md" color="blue.700">
                  🚀 Getting Started with CryptoWalletTracker
                </Heading>
                <VStack align="start" spacing={3}>
                  <HStack>
                    <Badge colorScheme="blue">1</Badge>
                    <Text>Use the "Search Wallet" button to analyze any Bitcoin address</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="blue">2</Badge>
                    <Text>View detailed analytics including balance, transactions, and patterns</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="blue">3</Badge>
                    <Text>All your searches are saved in history for easy access</Text>
                  </HStack>
                  <HStack>
                    <Badge colorScheme="blue">4</Badge>
                    <Text>Explore connected wallets and transaction timelines</Text>
                  </HStack>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Container>
  );
}