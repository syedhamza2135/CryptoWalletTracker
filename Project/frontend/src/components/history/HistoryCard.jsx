import {
  Box,
  Text,
  HStack,
  VStack,
  Badge,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { Trash2, Eye } from 'lucide-react';
import { formatBTC, formatDateTime, truncateAddress } from '../../utils/formatters';

export default function HistoryCard({ search, onDelete, onView }) {
  const toast = useToast();

  const handleDelete = async () => {
    try {
      await onDelete(search._id);
      toast({
        title: 'Search deleted',
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'green';
      case 'error': return 'red';
      case 'partial': return 'yellow';
      default: return 'gray';
    }
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" className="hover:shadow-md transition">
      <HStack justify="space-between" mb={2}>
        <Text fontWeight="bold" fontSize="sm" className="font-mono">
          {truncateAddress(search.walletAddress)}
        </Text>
        <Badge colorScheme={getStatusColor(search.apiStatus)}>
          {search.apiStatus}
        </Badge>
      </HStack>

      <VStack align="start" spacing={1} mb={3}>
        <Text fontSize="sm">Balance: {formatBTC(search.balance)}</Text>
        <Text fontSize="sm">Transactions: {search.totalTransactions || 0}</Text>
        <Text fontSize="xs" color="gray.500">
          {formatDateTime(search.searchDate)}
        </Text>
      </VStack>

      <HStack spacing={2}>
        <IconButton
          icon={<Eye size={16} />}
          size="sm"
          colorScheme="blue"
          onClick={() => onView(search)}
          aria-label="View details"
        />
        <IconButton
          icon={<Trash2 size={16} />}
          size="sm"
          colorScheme="red"
          onClick={handleDelete}
          aria-label="Delete search"
        />
      </HStack>
    </Box>
  );
}