import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Container,
} from '@chakra-ui/react';
import { ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box bg="blue.600" color="white" py={4} shadow="md">
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <HStack spacing={8}>
            <Text fontSize="xl" fontWeight="bold" as={RouterLink} to="/dashboard">
              BTC Wallet Tracker
            </Text>

            {user && (
              <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                <Button
                  as={RouterLink}
                  to="/dashboard"
                  variant="ghost"
                  color="white"
                  _hover={{ bg: 'blue.700' }}
                >
                  Dashboard
                </Button>
                <Button
                  as={RouterLink}
                  to="/wallet-search"
                  variant="ghost"
                  color="white"
                  _hover={{ bg: 'blue.700' }}
                >
                  Search
                </Button>
                <Button
                  as={RouterLink}
                  to="/history"
                  variant="ghost"
                  color="white"
                  _hover={{ bg: 'blue.700' }}
                >
                  History
                </Button>
                {isAdmin() && (
                  <Button
                    as={RouterLink}
                    to="/admin"
                    variant="ghost"
                    color="white"
                    _hover={{ bg: 'blue.700' }}
                  >
                    Admin
                  </Button>
                )}
              </HStack>
            )}
          </HStack>

          {user ? (
            <Menu>
              <MenuButton 
                as={Button} 
                rightIcon={<ChevronDown size={16} />} 
                variant="ghost" 
                color="white"
              >
                {user.name}
              </MenuButton>
              <MenuList color="gray.800">
                <MenuItem as={RouterLink} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={4}>
              <Button as={RouterLink} to="/login" variant="ghost" color="white">
                Login
              </Button>
              <Button as={RouterLink} to="/register" colorScheme="whiteAlpha">
                Register
              </Button>
            </HStack>
          )}
        </Flex>
      </Container>
    </Box>
  );
}