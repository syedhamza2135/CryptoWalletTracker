// src/components/history/SearchHistory.jsx
import { useState } from 'react';
import {
  Box,
  Button,
  SimpleGrid,
  Heading,
  Text,
  Spinner,
  Center,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useHistory } from '../../hooks/useHistory';
import HistoryCard from './HistoryCard';
import WalletDetails from '../wallet/WalletDetails';

export default function SearchHistory() {
  const { history, loading, deleteSearch, clearHistory } = useHistory();
  const [selectedSearch, setSelectedSearch] = useState(null);
  const toast = useToast();

  const handleClearAll = async () => {
    if (!confirm('Clear all search history?')) return;
    try {
      await clearHistory();
      toast({
        title: 'History cleared',
        status: 'success',
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: 'Clear failed',
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
      <Box className="flex justify-between items-center mb-6">
        <Heading size="lg">Search History</Heading>
        {history.length > 0 && (
          <Button colorScheme="red" size="sm" onClick={handleClearAll}>
            Clear All
          </Button>
        )}
      </Box>

      {history.length === 0 ? (
        <Text color="gray.500">No search history yet</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {history.map((search) => (
            <HistoryCard
              key={search._id}
              search={search}
              onDelete={deleteSearch}
              onView={setSelectedSearch}
            />
          ))}
        </SimpleGrid>
      )}

      <Modal
        isOpen={!!selectedSearch}
        onClose={() => setSelectedSearch(null)}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Wallet Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {selectedSearch && (
              <WalletDetails wallet={selectedSearch} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}