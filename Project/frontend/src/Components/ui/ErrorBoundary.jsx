import { Component } from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
          <VStack spacing={4} p={8} maxW="md" textAlign="center">
            <Heading size="lg" color="red.500">Something went wrong</Heading>
            <Text color="gray.600">{this.state.error?.message || 'An unexpected error occurred'}</Text>
            <Button colorScheme="blue" onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}