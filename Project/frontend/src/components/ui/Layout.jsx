import { Box } from '@chakra-ui/react';
import Navbar from './Navbar';

export default function Layout({ children }) {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Box as="main">
        {children}
      </Box>
    </Box>
  );
}