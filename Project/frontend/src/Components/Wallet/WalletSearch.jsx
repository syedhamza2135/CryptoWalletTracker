import { useState } from 'react';
import { Box, Input, Button, VStack, useToast } from '@chakra-ui/react';
import { searchWallet } from '../../api/wallet';
import WalletDetails from './WalletDetails';

export default function WalletSearch() {
  const [address, setAddress] = useState('');
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleSearch = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const { data } = await searchWallet(address);
      setWallet(data);
    } catch (error) {
      toast({
        title: 'Search Failed',
        description: error.message || 'Invalid wallet address',
        status: 'error',
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <VStack spacing={4} align="stretch">
      <Box className="flex gap-2">
        <Input
          placeholder="Enter Bitcoin address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="flex-1"
        />
        <Button
          colorScheme="blue"
          onClick={handleSearch}
          isLoading={loading}
        >
          Search
        </Button>
      </Box>
      {wallet && <WalletDetails wallet={wallet} />}
    </VStack>
  );
}