import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Card,
  CardBody,
  useColorModeValue,
  Grid,
  GridItem,
  Divider,
  Button,
  useToast
} from '@chakra-ui/react';
import { FiRefreshCw, FiCreditCard, FiTrendingUp, FiActivity } from 'react-icons/fi';
import useWallet from '../Hooks/useWallet';
import useSearch from '../Hooks/useSearch';
import WalletSearch from '../Components/Wallet/WalletSearch';
import WalletDisplay from '../Components/Wallet/WalletDisplay';
import BalanceChart from '../Components/Charts/BalanceChart';
import { StatsCard } from '../Components/Dashboard';

const DashboardPage = () => {
  const [searchAddress, setSearchAddress] = useState('');
  const { walletData, loading: walletLoading, searchWallet, clearWalletData } = useWallet();
  const { searchHistory, loading: historyLoading, fetchHistory } = useSearch();
  const toast = useToast();

  const cardBg = useColorModeValue('white', 'gray.800');

  // Load search history on component mount
  useEffect(() => {
    fetchHistory();
  }, []); // Remove fetchHistory dependency to prevent infinite re-renders

  const handleSearch = async (address) => {
    setSearchAddress(address);
    try {
      await searchWallet(address);
      toast({
        title: 'Wallet found!',
        description: 'Wallet data loaded successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      // Refresh search history
      await fetchHistory();
    } catch (error) {
      toast({
        title: 'Search failed',
        description: error.message || 'Unable to find wallet data.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleRefresh = async () => {
    if (searchAddress) {
      await handleSearch(searchAddress);
    }
  };

  const handleClear = () => {
    clearWalletData();
    setSearchAddress('');
  };

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <VStack spacing={2} align="start">
          <HStack justify="space-between" w="full" align="center">
            <Box>
              <Heading size="xl" color={useColorModeValue('gray.800', 'white')}>
                Dashboard
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.300')}>
                Search and monitor cryptocurrency wallets
              </Text>
            </Box>

            {walletData && (
              <HStack spacing={2}>
                <Button
                  size="sm"
                  variant="outline"
                  leftIcon={<FiRefreshCw />}
                  onClick={handleRefresh}
                  isLoading={walletLoading}
                >
                  Refresh
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  colorScheme="red"
                  onClick={handleClear}
                >
                  Clear
                </Button>
              </HStack>
            )}
          </HStack>
        </VStack>

        {/* Analytics Section */}
        <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }} gap={4}>
          <GridItem>
            <StatsCard
              title="Total Searches"
              value={searchHistory?.length || 0}
              icon={FiRefreshCw}
              helpText="this session"
            />
          </GridItem>
          <GridItem>
            <StatsCard
              title="Active Wallets"
              value={walletData ? 1 : 0}
              change={walletData ? "+1" : "0"}
              changeType="increase"
              icon={FiCreditCard}
              helpText="currently loaded"
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <StatsCard
              title="Search Success"
              value={`${Math.round((searchHistory?.filter(s => s.status === 'success').length || 0) / (searchHistory?.length || 1) * 100)}%`}
              change={`${searchHistory?.filter(s => s.status === 'success').length || 0} successful`}
              changeType="increase"
              icon={FiTrendingUp}
              helpText="success rate"
            />
          </GridItem>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <StatsCard
              title="Recent Activity"
              value={searchHistory?.length > 0 ? 'Active' : 'None'}
              change={searchHistory?.length > 0 ? `${searchHistory.length} searches` : 'No activity'}
              changeType={searchHistory?.length > 0 ? 'increase' : 'decrease'}
              icon={FiActivity}
              helpText="last session"
            />
          </GridItem>
        </Grid>

        {/* Search Section */}
        <Card bg={cardBg} shadow="md">
          <CardBody>
            <VStack spacing={4}>
              <Heading size="md" alignSelf="start">
                Wallet Search
              </Heading>
              <WalletSearch onSearch={handleSearch} />
            </VStack>
          </CardBody>
        </Card>

        {/* Wallet Data Display */}
        {walletData && (
          <VStack spacing={6} w="full">
            {/* Wallet Information */}
            <WalletDisplay walletData={walletData} />

            {/* Balance Chart */}
            <BalanceChart walletData={walletData} />
          </VStack>
        )}

        {/* Recent Searches */}
        {searchHistory && searchHistory.length > 0 && (
          <Card bg={cardBg} shadow="md">
            <CardBody>
              <VStack spacing={4} align="stretch">
                <HStack justify="space-between" align="center">
                  <Heading size="md">Recent Searches</Heading>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={fetchHistory}
                    isLoading={historyLoading}
                  >
                    Refresh
                  </Button>
                </HStack>

                <VStack spacing={3} align="stretch" maxH="500px" overflowY="auto">
                  {searchHistory.slice(0, 50).map((search, index) => (
                    <Box key={search.id || index}>
                      <HStack justify="space-between" align="center">
                        <VStack align="start" spacing={1} flex="1">
                          <Text fontSize="sm" fontWeight="medium" isTruncated maxW="400px">
                            {search.walletAddress}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {new Date(search.searchDate).toLocaleString()}
                          </Text>
                        </VStack>
                        <HStack spacing={2}>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleSearch(search.walletAddress)}
                            isLoading={walletLoading}
                          >
                            Load
                          </Button>
                        </HStack>
                      </HStack>
                      {index < searchHistory.slice(0, 10).length - 1 && <Divider mt={3} />}
                    </Box>
                  ))}
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Loading State */}
        {walletLoading && !walletData && (
          <Card bg={cardBg} shadow="md">
            <CardBody>
              <VStack spacing={6} py={12}>
                <Box
                  borderWidth={4}
                  borderColor="blue.500"
                  borderTopColor="transparent"
                  borderRadius="full"
                  w={12}
                  h={12}
                  animation="spin 1s linear infinite"
                />
                <VStack spacing={2} textAlign="center">
                  <Text fontSize="lg" fontWeight="medium">
                    Searching wallet...
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    This may take a few seconds
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        )}

        {/* Empty State */}
        {!walletData && !walletLoading && (
          <Card bg={cardBg} shadow="md">
            <CardBody>
              <VStack spacing={8} py={16} textAlign="center">
                <Box fontSize="8xl" opacity={0.3}>
                  🔍
                </Box>
                <VStack spacing={4}>
                  <Heading size="lg" color="gray.600">
                    Ready to Track Wallets
                  </Heading>
                  <Text color="gray.500" maxW="md">
                    Enter a Bitcoin wallet address above to analyze transactions,
                    track balances, and view comprehensive analytics.
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    Supports all Bitcoin address formats (Legacy, SegWit, Taproot)
                  </Text>
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Container>
  );
};

export default DashboardPage;
