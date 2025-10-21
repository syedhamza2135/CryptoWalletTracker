import {
  Box,
  Card,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge,
  Grid
} from '@chakra-ui/react';
import { formatBalance, formatDate } from '../../Utils/formatters';

const BalanceChart = ({ walletData }) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  // Use real wallet data for the chart
  const currentBalance = walletData?.balance ? walletData.balance / 100000000 : 0;
  const totalReceived = walletData?.totalReceived ? walletData.totalReceived / 100000000 : 0;
  const totalSent = walletData?.totalSent ? walletData.totalSent / 100000000 : 0;
  
  // Create chart data based on wallet analytics
  const chartData = walletData?.analytics ? [
    { 
      label: 'Largest Incoming', 
      value: walletData.analytics.largestIncoming ? walletData.analytics.largestIncoming / 100000000 : 0, 
      color: 'green.500' 
    },
    { 
      label: 'Largest Outgoing', 
      value: walletData.analytics.largestOutgoing ? walletData.analytics.largestOutgoing / 100000000 : 0, 
      color: 'red.500' 
    },
    { 
      label: 'Average Transaction', 
      value: walletData.analytics.averageTransaction ? walletData.analytics.averageTransaction / 100000000 : 0, 
      color: 'blue.500' 
    }
  ] : [
    { label: 'Current Balance', value: currentBalance, color: 'blue.500' },
    { label: 'Total Received', value: totalReceived, color: 'green.500' },
    { label: 'Total Sent', value: totalSent, color: 'red.500' }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value), 0);

  return (
    <Card bg={cardBg} shadow="md" w="full">
      <CardBody>
        <VStack spacing={6} align="stretch">
          <HStack justify="space-between" align="start">
            <VStack align="start" spacing={1}>
              <Heading size="md">Transaction Analytics</Heading>
              <Text fontSize="sm" color="gray.500">
                Key transaction metrics and patterns
              </Text>
            </VStack>

            <Stat textAlign="right">
              <StatLabel fontSize="sm">Current Balance</StatLabel>
              <StatNumber
                fontSize="lg"
                color="blue.500"
              >
                {currentBalance.toFixed(8)} BTC
              </StatNumber>
              <StatHelpText>
                <Badge colorScheme="blue" variant="subtle">
                  ≈ ${(currentBalance * 45000).toFixed(2)} USD
                </Badge>
              </StatHelpText>
            </Stat>
          </HStack>

          {/* Analytics Summary */}
          <VStack spacing={4} align="stretch">
            {chartData.map((item, index) => (
              <Box key={index}>
                <HStack justify="space-between" align="center">
                  <HStack spacing={2}>
                    <Box
                      w={3}
                      h={3}
                      borderRadius="full"
                      bg={item.color}
                    />
                    <Text fontSize="sm" fontWeight="medium">
                      {item.label}
                    </Text>
                  </HStack>
                  <Text fontSize="sm" fontWeight="bold">
                    {item.value.toFixed(8)} BTC
                  </Text>
                </HStack>
                
                {/* Progress bar */}
                <Box
                  w="full"
                  h={2}
                  bg="gray.200"
                  borderRadius="full"
                  mt={1}
                  overflow="hidden"
                >
                  <Box
                    w={`${maxValue > 0 ? (item.value / maxValue) * 100 : 0}%`}
                    h="full"
                    bg={item.color}
                    borderRadius="full"
                    transition="width 0.3s ease"
                  />
                </Box>
              </Box>
            ))}
          </VStack>

          {/* Transaction Analytics */}
          {walletData && (
            <VStack spacing={4} align="stretch" pt={4} borderTop="1px" borderColor="gray.200">
              <Text fontSize="sm" fontWeight="medium" color="gray.700">
                Transaction Summary
              </Text>
              
              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600">Total Transactions</Text>
                  <Text fontSize="lg" fontWeight="bold" color="blue.500">
                    {walletData.totalTransactions || 0}
                  </Text>
                </VStack>
                
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600">Wallet Age</Text>
                  <Text fontSize="lg" fontWeight="bold" color="purple.500">
                    {walletData.firstTransactionDate ? 
                      Math.floor((new Date() - new Date(walletData.firstTransactionDate)) / (1000 * 60 * 60 * 24)) + ' days' : 
                      'N/A'}
                  </Text>
                </VStack>
                
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600">First Transaction</Text>
                  <Text fontSize="sm" fontWeight="medium">
                    {walletData.firstTransactionDate ? formatDate(walletData.firstTransactionDate, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                  </Text>
                </VStack>
                
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm" color="gray.600">Last Transaction</Text>
                  <Text fontSize="sm" fontWeight="medium">
                    {walletData.lastTransactionDate ? formatDate(walletData.lastTransactionDate, { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A'}
                  </Text>
                </VStack>
              </Grid>
              
              {/* Advanced Analytics - only show if available */}
              {walletData.analytics && (
                <>
                  <Text fontSize="sm" fontWeight="medium" color="gray.700" pt={2}>
                    Advanced Analytics
                  </Text>
                  
                  <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                    <VStack align="start" spacing={2}>
                      <Text fontSize="sm" color="gray.600">Largest Incoming</Text>
                      <Text fontSize="md" fontWeight="bold" color="green.500">
                        {formatBalance(walletData.analytics.largestIncoming)} BTC
                      </Text>
                    </VStack>
                    
                    <VStack align="start" spacing={2}>
                      <Text fontSize="sm" color="gray.600">Largest Outgoing</Text>
                      <Text fontSize="md" fontWeight="bold" color="red.500">
                        {formatBalance(walletData.analytics.largestOutgoing)} BTC
                      </Text>
                    </VStack>
                    
                    <VStack align="start" spacing={2}>
                      <Text fontSize="sm" color="gray.600">Average Transaction</Text>
                      <Text fontSize="md" fontWeight="bold" color="blue.500">
                        {formatBalance(walletData.analytics.averageTransaction)} BTC
                      </Text>
                    </VStack>
                    
                    <VStack align="start" spacing={2}>
                      <Text fontSize="sm" color="gray.600">Connected Wallets</Text>
                      <Text fontSize="md" fontWeight="bold" color="purple.500">
                        {walletData.analytics.topConnectedWallets?.length || 0} recurring
                      </Text>
                    </VStack>
                  </Grid>
                </>
              )}
            </VStack>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

export default BalanceChart;