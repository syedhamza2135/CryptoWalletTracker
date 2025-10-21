import {
  Card,
  CardBody,
  VStack,
  HStack,
  Text,
  Badge,
  Box,
  Divider,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  Flex
} from '@chakra-ui/react';
import { FiDollarSign, FiActivity, FiTrendingUp, FiCopy } from 'react-icons/fi';
import { formatAddress, formatBalance, formatDate, formatCurrency, formatLargeNumber } from '../../Utils/formatters';

const WalletDisplay = ({ walletData }) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  if (!walletData) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <VStack spacing={6} w="full">
      {/* Wallet Address Card */}
      <Card bg={cardBg} shadow="md" w="full">
        <CardBody>
          <VStack spacing={4} align="start">
            <HStack justify="space-between" w="full">
              <Text fontSize="sm" color="gray.500" fontWeight="medium">
                Wallet Address
              </Text>
              <Badge colorScheme="blue" variant="subtle">
                {walletData.network || 'Bitcoin'}
              </Badge>
            </HStack>

            <HStack spacing={2} w="full">
              <Text fontFamily="mono" fontSize="sm" flex="1" isTruncated>
                {formatAddress(walletData.address)}
              </Text>
              <Icon
                as={FiCopy}
                cursor="pointer"
                onClick={() => copyToClipboard(walletData.address)}
                _hover={{ color: 'blue.500' }}
              />
            </HStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Balance Cards */}
      <Box w="full">
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Balance Overview
        </Text>

        <VStack spacing={4}>
          {/* Total Balance */}
          <Card bg={cardBg} shadow="md" w="full">
            <CardBody>
              <Stat>
                <StatLabel>
                  <Icon as={FiDollarSign} mr={2} />
                  Total Balance
                </StatLabel>
                <StatNumber fontSize="2xl" color="green.500">
                  {formatCurrency(walletData.balance)}
                </StatNumber>
                <StatHelpText>
                  <Badge colorScheme="green" variant="subtle">
                    ≈ {formatBalance(walletData.balance)} BTC
                  </Badge>
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          {/* BTC Balance */}
          <Card bg={cardBg} shadow="md" w="full">
            <CardBody>
              <Stat>
                <StatLabel>
                  <Icon as={FiActivity} mr={2} />
                  BTC Balance
                </StatLabel>
                <StatNumber fontSize="2xl" color="orange.500">
                  {formatBalance(walletData.balance)} BTC
                </StatNumber>
                <StatHelpText>
                  <Badge colorScheme="orange" variant="subtle">
                    Native Currency
                  </Badge>
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </VStack>
      </Box>

      {/* Transaction Summary */}
      <Box w="full">
        <Text fontSize="lg" fontWeight="semibold" mb={4}>
          Transaction Summary
        </Text>

        <Card bg={cardBg} shadow="md" w="full">
          <CardBody>
            <VStack spacing={4}>
              <HStack justify="space-between" w="full">
                <Text fontSize="sm" color="gray.500">
                  Total Transactions
                </Text>
                <Badge colorScheme="blue" fontSize="sm">
                  {walletData.totalTransactions || 0}
                </Badge>
              </HStack>

              <Divider />

              <HStack justify="space-between" w="full">
                <Text fontSize="sm" color="gray.500">
                  Total Received
                </Text>
                <Text fontSize="sm" color="green.500">
                  {formatBalance(walletData.totalReceived)} BTC
                </Text>
              </HStack>

              <HStack justify="space-between" w="full">
                <Text fontSize="sm" color="gray.500">
                  Total Sent
                </Text>
                <Text fontSize="sm" color="red.500">
                  {formatBalance(walletData.totalSent)} BTC
                </Text>
              </HStack>

              {walletData.firstTransactionDate && (
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.500">
                    First Transaction
                  </Text>
                  <Text fontSize="sm">
                    {formatDate(walletData.firstTransactionDate, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </Text>
                </HStack>
              )}

              {walletData.lastTransactionDate && (
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.500">
                    Last Transaction
                  </Text>
                  <Text fontSize="sm">
                    {formatDate(walletData.lastTransactionDate, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </Text>
                </HStack>
              )}
            </VStack>
          </CardBody>
        </Card>
      </Box>

      {/* Analytics Summary */}
      {walletData.analytics && (
        <Box w="full">
          <Text fontSize="lg" fontWeight="semibold" mb={4}>
            Analytics
          </Text>

          <Card bg={cardBg} shadow="md" w="full">
            <CardBody>
              <VStack spacing={4}>
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.500">
                    Largest Incoming
                  </Text>
                  <Text fontSize="sm" color="green.500">
                    {formatBalance(walletData.analytics.largestIncoming)} BTC
                  </Text>
                </HStack>

                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.500">
                    Largest Outgoing
                  </Text>
                  <Text fontSize="sm" color="red.500">
                    {formatBalance(walletData.analytics.largestOutgoing)} BTC
                  </Text>
                </HStack>

                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.500">
                    Average Transaction
                  </Text>
                  <Text fontSize="sm" color="blue.500">
                    {formatBalance(walletData.analytics.averageTransaction)} BTC
                  </Text>
                </HStack>

                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.500">
                    One-time Wallets
                  </Text>
                  <Badge colorScheme="purple" fontSize="sm">
                    {walletData.analytics.oneTimeWallets || 0}
                  </Badge>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      )}
    </VStack>
  );
};

export default WalletDisplay;