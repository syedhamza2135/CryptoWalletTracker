import { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  VStack,
  Alert,
  AlertIcon,
  useColorModeValue,
  Icon,
  Text
} from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import useWallet from '../../Hooks/useWallet';
import { validationRules } from '../../Utils/validation';

const WalletSearch = ({ onSearch }) => {
  const [address, setAddress] = useState('');
  const [validationError, setValidationError] = useState('');
  const { loading, error, searchWallet } = useWallet();

  const validateAddress = (addr) => {
    const trimmed = addr.trim();
    if (!trimmed) return 'Wallet address is required';
    
    const result = validationRules.bitcoinAddress(trimmed);
    return typeof result === 'string' ? result : null;
  };

  const handleSearch = async () => {
    const trimmedAddress = address.trim();
    if (!trimmedAddress) return;

    // Validate address format
    const validationErr = validateAddress(trimmedAddress);
    if (validationErr) {
      setValidationError(validationErr);
      return;
    }

    setValidationError('');

    try {
      const result = await searchWallet(trimmedAddress);
      if (onSearch) {
        onSearch(result);
      }
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <VStack spacing={4} w="full">
      <VStack spacing={2} w="full" align="stretch">
        <InputGroup size="lg">
          <InputLeftElement>
            <Icon as={FiSearch} color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Enter Bitcoin wallet address (e.g., 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa)"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (validationError) setValidationError('');
            }}
            onKeyPress={handleKeyPress}
            bg={useColorModeValue('white', 'gray.700')}
            isInvalid={!!validationError}
            borderColor={validationError ? 'red.500' : undefined}
          />
        </InputGroup>
        <Text fontSize="sm" color="gray.500">
          Enter a valid Bitcoin address starting with 1, 3, or bc1
          <Button 
            variant="link" 
            size="sm" 
            colorScheme="blue" 
            ml={2}
            onClick={() => setAddress('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa')}
          >
            Use example
          </Button>
        </Text>
      </VStack>

      <Button
        colorScheme="blue"
        size="lg"
        w="full"
        onClick={handleSearch}
        isLoading={loading}
        loadingText="Searching..."
        isDisabled={!address.trim()}
      >
        Search Wallet
      </Button>

      {(validationError || error) && (
        <Alert status="error" borderRadius="md" w="full">
          <AlertIcon />
          {validationError || error}
        </Alert>
      )}
    </VStack>
  );
};

export default WalletSearch;