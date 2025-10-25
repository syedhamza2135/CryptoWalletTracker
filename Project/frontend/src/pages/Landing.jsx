import { Box, Container, VStack, Text, HStack, Button, SimpleGrid, Icon, Input, InputGroup, InputLeftElement, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Shield,
  Zap,
  BarChart3,
  Bitcoin,
  ArrowRight,
  CheckCircle,
  Wallet,
  Activity,
  Search
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [searchAddress, setSearchAddress] = useState('');

  // Redirect authenticated users to dashboard
  if (user) {
    navigate('/dashboard', { replace: true });
    return null;
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchAddress.trim()) {
      toast({
        title: 'Please enter a Bitcoin address',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    // Navigate to wallet search page with the address
    navigate(`/wallet-search?address=${encodeURIComponent(searchAddress.trim())}`);
  };

  const features = [
    {
      icon: Wallet,
      title: 'Wallet Tracking',
      description: 'Monitor multiple Bitcoin addresses with real-time balance updates and transaction history.'
    },
    {
      icon: Activity,
      title: 'Transaction Analysis',
      description: 'Detailed insights into your wallet activity with advanced filtering and search capabilities.'
    },
    {
      icon: BarChart3,
      title: 'Portfolio Analytics',
      description: 'Comprehensive charts and analytics to understand your Bitcoin holdings performance.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We never store private keys or sensitive information.'
    }
  ];

  return (
    <Box minH="100vh" bg="gray.50">
      {/* Navigation */}
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bg="white"
        borderBottom="1px solid"
        borderColor="gray.200"
        zIndex={10}
        backdropFilter="blur(10px)"
        bgColor="whiteAlpha.900"
      >
        <Container maxW="6xl" py={4}>
          <HStack justify="space-between" align="center">
            <HStack spacing={3}>
              <Box
                w={10}
                h={10}
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Bitcoin size={24} color="white" />
              </Box>
              <Text fontSize="xl" fontWeight="bold" color="gray.800">
                BTC Tracker
              </Text>
            </HStack>

            <HStack spacing={4}>
              <Button
                as={Link}
                to="/login"
                variant="ghost"
                color="gray.600"
                _hover={{ color: 'purple.600', bg: 'purple.50' }}
              >
                Sign In
              </Button>
              <Button
                as={Link}
                to="/register"
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                color="white"
                _hover={{
                  bg: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: 'lg'
                }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
              >
                Get Started
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box pt={24} pb={20} bg="white">
        <Container maxW="6xl">
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={16} alignItems="center">
            <VStack spacing={8} align="start">
              <VStack spacing={4} align="start">
                <Text
                  fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
                  fontWeight="bold"
                  color="gray.900"
                  lineHeight="1.1"
                >
                  Track Bitcoin
                  <Text as="span" color="purple.600"> Wallets</Text>
                  <br />
                  Like a Pro
                </Text>
                <Text
                  fontSize={{ base: "lg", md: "xl" }}
                  color="gray.600"
                  lineHeight="1.6"
                  maxW="lg"
                >
                  Monitor balances, analyze transactions, and gain insights into your Bitcoin portfolio with powerful, real-time tracking tools.
                </Text>
              </VStack>

              <HStack spacing={4} flexWrap="wrap">
                <Button
                  as={Link}
                  to="/register"
                  size="lg"
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  color="white"
                  _hover={{
                    bg: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                    transform: 'translateY(-2px)',
                    boxShadow: 'xl'
                  }}
                  _active={{ transform: 'translateY(0)' }}
                  transition="all 0.2s"
                  px={8}
                  py={6}
                  fontSize="lg"
                  fontWeight="semibold"
                  rightIcon={<ArrowRight size={20} />}
                >
                  Start Tracking Free
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  size="lg"
                  variant="outline"
                  borderColor="gray.300"
                  color="gray.700"
                  _hover={{
                    borderColor: 'purple.300',
                    color: 'purple.600',
                    bg: 'purple.50'
                  }}
                  px={8}
                  py={6}
                  fontSize="lg"
                >
                  Sign In
                </Button>
              </HStack>

              <HStack spacing={6} color="gray.500" fontSize="sm">
                <HStack spacing={2}>
                  <CheckCircle size={16} color="#48BB78" />
                  <Text>Free forever</Text>
                </HStack>
                <HStack spacing={2}>
                  <CheckCircle size={16} color="#48BB78" />
                  <Text>No registration required</Text>
                </HStack>
                <HStack spacing={2}>
                  <CheckCircle size={16} color="#48BB78" />
                  <Text>Real-time updates</Text>
                </HStack>
              </HStack>
            </VStack>

            {/* Search Bar */}
            <Box position="relative" w="full" maxW="lg">
              <Box
                as="form"
                onSubmit={handleSearch}
                bg="white"
                borderRadius="2xl"
                p={2}
                boxShadow="2xl"
                border="1px solid"
                borderColor="gray.200"
                _hover={{
                  boxShadow: '3xl',
                  borderColor: 'purple.200'
                }}
                transition="all 0.3s"
              >
                <InputGroup size="lg">
                  <InputLeftElement pointerEvents="none">
                    <Search size={20} color="#A0AEC0" />
                  </InputLeftElement>
                  <Input
                    placeholder="Enter Bitcoin address (e.g., bc1q...)"
                    value={searchAddress}
                    onChange={(e) => setSearchAddress(e.target.value)}
                    border="none"
                    _focus={{
                      boxShadow: 'none',
                      border: 'none'
                    }}
                    fontSize="md"
                    pr="4.5rem"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    color="white"
                    _hover={{
                      bg: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
                      transform: 'translateY(-1px)',
                      boxShadow: 'lg'
                    }}
                    _active={{ transform: 'translateY(0)' }}
                    transition="all 0.2s"
                    borderRadius="xl"
                    px={6}
                    position="absolute"
                    right={2}
                    top={2}
                    bottom={2}
                    zIndex={1}
                  >
                    <Search size={18} />
                  </Button>
                </InputGroup>
              </Box>

              <VStack spacing={2} mt={4} align="center">
                <Text fontSize="sm" color="gray.500" textAlign="center">
                  Try it now - no account required
                </Text>
                <HStack spacing={4} color="gray.400" fontSize="xs">
                  <Text>Examples:</Text>
                  <Button
                    variant="link"
                    color="purple.600"
                    fontSize="xs"
                    onClick={() => setSearchAddress('bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq')}
                    _hover={{ color: 'purple.800' }}
                  >
                    bc1qar0srrr...
                  </Button>
                </HStack>
              </VStack>

              {/* Floating elements */}
              <Box
                position="absolute"
                top={-4}
                right={-4}
                w={12}
                h={12}
                bg="green.400"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                boxShadow="lg"
                animation="pulse 2s infinite"
              >
                <Search size={16} color="white" />
              </Box>
            </Box>
          </SimpleGrid>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py={20} bg="gray.50">
        <Container maxW="6xl">
          <VStack spacing={16}>
            <VStack spacing={4} textAlign="center">
              <Text
                fontSize="3xl"
                fontWeight="bold"
                color="gray.900"
              >
                Everything You Need to Track Bitcoin
              </Text>
              <Text
                fontSize="lg"
                color="gray.600"
                maxW="2xl"
                textAlign="center"
              >
                Powerful features designed for serious Bitcoin investors and enthusiasts.
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8} w="full">
              {features.map((feature, index) => (
                <Box
                  key={index}
                  bg="white"
                  p={6}
                  borderRadius="xl"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    borderColor: 'purple.200'
                  }}
                  transition="all 0.3s"
                >
                  <VStack spacing={4} align="start" h="full">
                    <Box
                      p={3}
                      bg="purple.50"
                      borderRadius="lg"
                      color="purple.600"
                    >
                      <Icon as={feature.icon} size={24} />
                    </Box>
                    <VStack spacing={2} align="start" flex={1}>
                      <Text fontSize="lg" fontWeight="semibold" color="gray.900">
                        {feature.title}
                      </Text>
                      <Text color="gray.600" lineHeight="1.6" fontSize="sm">
                        {feature.description}
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
        <Container maxW="4xl">
          <VStack spacing={8} textAlign="center" color="white">
            <VStack spacing={4}>
              <Text
                fontSize="3xl"
                fontWeight="bold"
              >
                Start Tracking Bitcoin Today
              </Text>
              <Text
                fontSize="lg"
                opacity={0.9}
                maxW="2xl"
              >
                Join thousands of users who rely on BTC Tracker for their cryptocurrency monitoring needs.
              </Text>
            </VStack>

            <HStack spacing={4} flexWrap="wrap" justify="center">
              <Button
                as={Link}
                to="/register"
                size="lg"
                bg="white"
                color="purple.600"
                _hover={{
                  bg: 'gray.50',
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl'
                }}
                _active={{ transform: 'translateY(0)' }}
                transition="all 0.2s"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="semibold"
                rightIcon={<ArrowRight size={20} />}
              >
                Get Started Now
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Footer */}
      <Box py={8} bg="gray.900" borderTop="1px solid" borderColor="gray.800">
        <Container maxW="6xl">
          <VStack spacing={4}>
            <HStack spacing={8} flexWrap="wrap" justify="center">
              <HStack spacing={3}>
                <Box
                  w={8}
                  h={8}
                  bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Bitcoin size={16} color="white" />
                </Box>
                <Text color="gray.400" fontSize="sm" fontWeight="semibold">
                  BTC Tracker
                </Text>
              </HStack>
              <Text color="gray.400" fontSize="sm">
                © 2025 BTC Tracker. Built for the crypto community.
              </Text>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
}