import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Icon,
  Grid,
  GridItem,
  useColorModeValue,
  Card,
  CardBody,
  Badge,
  Flex
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  FiSearch,
  FiTrendingUp,
  FiShield,
  FiZap,
  FiBarChart,
  FiLock
} from 'react-icons/fi';

const HomePage = () => {
  const bgGradient = useColorModeValue(
    'linear(to-br, blue.50, purple.50)',
    'linear(to-br, blue.900, purple.900)'
  );

  const cardBg = useColorModeValue('white', 'gray.800');
  const headingColor = useColorModeValue('gray.800', 'white');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  const features = [
    {
      icon: FiSearch,
      title: 'Advanced Search',
      description: 'Search and track any cryptocurrency wallet with real-time data and transaction history.'
    },
    {
      icon: FiTrendingUp,
      title: 'Market Analytics',
      description: 'Get detailed insights into market trends, portfolio performance, and investment opportunities.'
    },
    {
      icon: FiShield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and secure. We never store your private keys or sensitive information.'
    },
    {
      icon: FiZap,
      title: 'Real-time Updates',
      description: 'Stay updated with live transaction monitoring and instant notifications for wallet activity.'
    },
    {
      icon: FiBarChart,
      title: 'Comprehensive Charts',
      description: 'Visualize your portfolio with interactive charts and detailed transaction analytics.'
    },
    {
      icon: FiLock,
      title: 'Multi-wallet Support',
      description: 'Track multiple wallets across different cryptocurrencies in one unified dashboard.'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient={bgGradient}
        py={20}
        px={4}
      >
        <Container maxW="6xl">
          <VStack spacing={8} textAlign="center">
            <VStack spacing={4}>
              <Badge colorScheme="blue" fontSize="sm" px={3} py={1}>
                🚀 Now in Beta
              </Badge>
              <Heading
                size="2xl"
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
              >
                Track Your Crypto Portfolio Like a Pro
              </Heading>
              <Text
                fontSize="xl"
                color={useColorModeValue('gray.600', 'gray.300')}
                maxW="2xl"
              >
                Monitor wallet balances, track transactions, and analyze market trends with our comprehensive cryptocurrency tracking platform.
              </Text>
            </VStack>

            <HStack spacing={4} pt={4}>
              <Button
                as={Link}
                to="/register"
                size="lg"
                colorScheme="blue"
                px={8}
                _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                transition="all 0.2s"
              >
                Get Started Free
              </Button>
              <Button
                as={Link}
                to="/login"
                size="lg"
                variant="outline"
                px={8}
                _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
              >
                Sign In
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="6xl" py={20} px={4}>
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading size="xl" color={useColorModeValue('gray.800', 'white')}>
              Powerful Features for Crypto Enthusiasts
            </Heading>
            <Text
              fontSize="lg"
              color={useColorModeValue('gray.600', 'gray.300')}
              maxW="2xl"
            >
              Everything you need to manage and monitor your cryptocurrency investments effectively.
            </Text>
          </VStack>

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={8}>
            {features.map((feature, index) => (
              <GridItem key={index}>
                <Card
                  bg={cardBg}
                  shadow="md"
                  _hover={{ shadow: 'lg', transform: 'translateY(-4px)' }}
                  transition="all 0.2s"
                  h="full"
                >
                  <CardBody>
                    <VStack spacing={4} align="start" h="full">
                      <Flex
                        w={12}
                        h={12}
                        bg="blue.500"
                        borderRadius="lg"
                        align="center"
                        justify="center"
                      >
                        <Icon as={feature.icon} w={6} h={6} color="white" />
                      </Flex>
                      <Heading size="md" color={headingColor}>
                        {feature.title}
                      </Heading>
                      <Text color={textColor} flex="1">
                        {feature.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={20} px={4}>
        <Container maxW="4xl">
          <VStack spacing={8} textAlign="center">
            <VStack spacing={4}>
              <Heading size="xl" color={useColorModeValue('gray.800', 'white')}>
                Ready to Take Control of Your Crypto?
              </Heading>
              <Text
                fontSize="lg"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                Join thousands of users who trust CryptoTracker for their portfolio management.
              </Text>
            </VStack>

            <HStack spacing={4}>
              <Button
                as={Link}
                to="/register"
                size="lg"
                colorScheme="blue"
                px={8}
              >
                Start Tracking Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                px={8}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
              >
                Learn More
              </Button>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
