import React from 'react';
import { Box, Text, Button, VStack, Alert, AlertIcon } from '@chakra-ui/react';

/**
 * Error Boundary component to catch JavaScript errors in the component tree
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console (and could send to error reporting service)
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });

    // Call optional error callback
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Box p={8} textAlign="center">
          <VStack spacing={4}>
            <Alert status="error" maxW="md">
              <AlertIcon />
              <VStack align="start" spacing={1}>
                <Text fontWeight="bold">Something went wrong!</Text>
                <Text fontSize="sm">
                  {this.props.message || 'An unexpected error occurred. Please try again.'}
                </Text>
              </VStack>
            </Alert>

            <Button colorScheme="blue" onClick={this.handleRetry}>
              Try Again
            </Button>

            {import.meta.env.DEV && this.state.error && (
              <Box mt={4} p={4} bg="gray.100" borderRadius="md" textAlign="left" maxW="800px">
                <Text fontWeight="bold" color="red.500">Error Details (Development Only):</Text>
                <Text fontSize="sm" mt={2} fontFamily="mono">
                  {this.state.error.toString()}
                </Text>
                {this.state.errorInfo && (
                  <Text fontSize="sm" mt={2} fontFamily="mono" whiteSpace="pre-wrap">
                    {this.state.errorInfo.componentStack}
                  </Text>
                )}
              </Box>
            )}
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;