import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Input, Button, VStack, useToast } from '@chakra-ui/react';
import { searchWallet } from '../../api/wallet';
import WalletDetails from './WalletDetails';

export default function WalletSearch() {
  const [address, setAddress] = useState('');
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const toast = useToast();

  // Check for address parameter on component mount
  useEffect(() => {
    const addressParam = searchParams.get('address');
    if (addressParam && !wallet && !loading) {
      setAddress(addressParam);
      performSearch(addressParam);
    }
  }, []); // Empty dependency array - only run once on mount

  const performSearch = async (searchAddress) => {
    if (!searchAddress) return;
    setLoading(true);
    try {
      const { data } = await searchWallet(searchAddress);
      setWallet(data);
    } catch (error) {
      toast({
        title: 'Search Failed',
        description: error.message || 'Invalid wallet address',
        status: 'error',
        duration: 4000,
      });
      setWallet(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!address.trim()) {
      toast({
        title: 'Please enter an address',
        status: 'warning',
        duration: 3000,
      });
      return;
    }
    setWallet(null); // Clear previous results
    await performSearch(address.trim());
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
          loadingText="Searching..."
        >
          Search
        </Button>
      </Box>
      {wallet && <WalletDetails wallet={wallet} />}
    </VStack>
  );
}