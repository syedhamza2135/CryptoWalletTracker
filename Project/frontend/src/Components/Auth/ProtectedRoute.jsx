import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import { Box, Spinner, Text, VStack } from '@chakra-ui/react';

/**
 * Protected Route Component
 * Redirects to login if user is not authenticated
 * Shows loading spinner while checking authentication
 */
const ProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated } = useAuthContext();
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (loading) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg="gray.50"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" thickness="4px" />
          <Text color="gray.600">Loading...</Text>
        </VStack>
      </Box>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the attempted location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Render protected content
  return children;
};

export default ProtectedRoute;