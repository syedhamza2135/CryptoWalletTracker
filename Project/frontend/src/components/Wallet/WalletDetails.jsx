import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Badge,
  Divider,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react';
import { formatBTC, formatSatoshis, formatDate, formatNumber, truncateAddress } from '../../utils/formatters';

export default function WalletDetails({ wallet }) {
  // Handle both search result structure (nested walletData) and history structure (flattened)
  const data = wallet.walletData || {
    balance: wallet.balance,
    totalTransactions: wallet.totalTransactions,
    totalReceived: wallet.totalReceived,
    totalSent: wallet.totalSent,
    firstTransactionDate: wallet.firstTransactionDate,
    lastTransactionDate: wallet.lastTransactionDate
  };
  const analytics = wallet.analytics || {};

  return (
    <Box p={6} borderWidth={1} borderRadius="lg">
      <VStack align="stretch" spacing={4}>
        <HStack justify="space-between">
          <Heading size="md">Wallet Details</Heading>
          <Badge colorScheme="green" fontSize="sm">
            {wallet.apiStatus}
          </Badge>
        </HStack>

        <Box p={4} bg="gray.50" borderRadius="md">
          <Text fontSize="sm" color="gray.600" mb={1}>Address</Text>
          <Text fontSize="sm" className="font-mono break-all">
            {wallet.walletAddress}
          </Text>
        </Box>

        <Divider />

        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4}>
          <Stat>
            <StatLabel>Balance</StatLabel>
            <StatNumber fontSize="lg">{formatBTC(data.balance)}</StatNumber>
            <Text fontSize="xs" color="gray.500">
              {formatSatoshis(data.balance)} satoshis
            </Text>
          </Stat>

          <Stat>
            <StatLabel>Total Transactions</StatLabel>
            <StatNumber fontSize="lg">{formatNumber(data.totalTransactions)}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Total Received</StatLabel>
            <StatNumber fontSize="lg">{formatBTC(data.totalReceived)}</StatNumber>
          </Stat>

          <Stat>
            <StatLabel>Total Sent</StatLabel>
            <StatNumber fontSize="lg">{formatBTC(data.totalSent)}</StatNumber>
          </Stat>
        </SimpleGrid>

        <Divider />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" mb={1}>First Transaction</Text>
            <Text fontSize="sm" color="gray.600">
              {formatDate(data.firstTransactionDate)}
            </Text>
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" mb={1}>Last Transaction</Text>
            <Text fontSize="sm" color="gray.600">
              {formatDate(data.lastTransactionDate)}
            </Text>
          </Box>
        </SimpleGrid>

        <Divider />

        {Object.keys(analytics).length > 0 && (
        <VStack align="stretch" spacing={4}>
          <Heading size="md">Transaction Analytics</Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            <Stat>
              <StatLabel>Largest Incoming</StatLabel>
              <StatNumber fontSize="lg">{formatBTC(analytics.largestIncoming)}</StatNumber>
              <Text fontSize="xs" color="gray.500">
                {formatSatoshis(analytics.largestIncoming)} satoshis
              </Text>
            </Stat>

            <Stat>
              <StatLabel>Largest Outgoing</StatLabel>
              <StatNumber fontSize="lg">{formatBTC(analytics.largestOutgoing)}</StatNumber>
              <Text fontSize="xs" color="gray.500">
                {formatSatoshis(analytics.largestOutgoing)} satoshis
              </Text>
            </Stat>

            <Stat>
              <StatLabel>Average Transaction</StatLabel>
              <StatNumber fontSize="lg">{formatBTC(analytics.averageTransaction)}</StatNumber>
              <Text fontSize="xs" color="gray.500">
                {formatSatoshis(analytics.averageTransaction)} satoshis
              </Text>
            </Stat>
          </SimpleGrid>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={2}>Top Connected Wallets</Text>
              {analytics.topConnectedWallets?.length > 0 ? (
                <VStack align="stretch" spacing={1}>
                  {analytics.topConnectedWallets.slice(0, 5).map((wallet, index) => (
                    <HStack key={index} justify="space-between">
                      <Text fontSize="xs" className="font-mono">
                        {truncateAddress(wallet.address)}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {wallet.count} txs
                      </Text>
                    </HStack>
                  ))}
                </VStack>
              ) : (
                <Text fontSize="xs" color="gray.500">No connected wallets</Text>
              )}
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="semibold" mb={2}>Wallet Statistics</Text>
              <VStack align="stretch" spacing={1}>
                <HStack justify="space-between">
                  <Text fontSize="xs">One-time Wallets:</Text>
                  <Text fontSize="xs" color="gray.600">{analytics.oneTimeWallets || 0}</Text>
                </HStack>
                <HStack justify="space-between">
                  <Text fontSize="xs">Transaction Timeline:</Text>
                  <Text fontSize="xs" color="gray.600">{analytics.transactionTimeline?.length || 0} months</Text>
                </HStack>
              </VStack>
            </Box>
          </SimpleGrid>
        </VStack>
        )}

        {wallet.transactions && wallet.transactions.length > 0 && (
          <>
            <Divider />
            <VStack align="stretch" spacing={4}>
              <Heading size="md">Recent Transactions</Heading>
              <VStack align="stretch" spacing={2} maxH="300px" overflowY="auto">
                {wallet.transactions.map((tx, index) => (
                  <Box key={index} p={3} borderWidth={1} borderRadius="md">
                    <HStack justify="space-between">
                      <VStack align="start" spacing={1}>
                        <Text fontSize="xs" className="font-mono">{tx.hash.slice(0, 16)}...</Text>
                        <Text fontSize="xs" color="gray.600">{formatDate(tx.time)}</Text>
                      </VStack>
                      <VStack align="end" spacing={1}>
                        <Badge colorScheme={tx.type === 'received' ? 'green' : 'red'}>
                          {tx.type}
                        </Badge>
                        <Text fontSize="sm" fontWeight="semibold">
                          {formatBTC(tx.amount)}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </VStack>
          </>
        )}

        {wallet.errorMessage && (
          <Box p={3} bg="red.50" borderRadius="md">
            <Text fontSize="sm" color="red.600">{wallet.errorMessage}</Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}