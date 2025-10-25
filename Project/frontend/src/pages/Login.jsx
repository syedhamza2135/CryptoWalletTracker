import { Box, Container, VStack, Text, HStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="md">
        <VStack spacing={8}>
          {/* Logo/Brand */}
          <VStack spacing={2}>
            <Box
              w={16}
              h={16}
              bg="white"
              borderRadius="xl"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="xl"
            >
              <Text fontSize="3xl" fontWeight="bold" color="purple.600">
                ₿
              </Text>
            </Box>
            <Text fontSize="2xl" fontWeight="bold" color="white">
              BTC Tracker
            </Text>
            <Text color="whiteAlpha.800" textAlign="center">
              Track Bitcoin wallets with advanced analytics
            </Text>
          </VStack>

          {/* Login Form */}
          <LoginForm />

          {/* Footer */}
          <HStack spacing={1} color="whiteAlpha.700">
            <Text>Don't have an account?</Text>
            <Text
              as={Link}
              to="/register"
              color="white"
              fontWeight="semibold"
              _hover={{ textDecoration: 'underline' }}
            >
              Sign up
            </Text>
          </HStack>
        </VStack>
      </Container>
    </Box>
  );
}