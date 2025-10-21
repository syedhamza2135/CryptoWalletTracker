import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  HStack,
  Text,
  Avatar,
  Badge
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FiSearch, FiClock, FiUser, FiLogOut, FiHome } from 'react-icons/fi';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuthContext();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Color mode values - must be called at top level
  const bgColor = useColorModeValue('white', 'gray.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const textColor = useColorModeValue('gray.800', 'white');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <Box
      bg={bgColor}
      px={4}
      position="sticky"
      top={0}
      zIndex={10}
      borderBottom={1}
      borderStyle="solid"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Flex alignItems="center">
          <Link to={isAuthenticated ? '/dashboard' : '/'}>
            <HStack spacing={2}>
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                ₿
              </Text>
              <Text fontSize="xl" fontWeight="bold" color={textColor}>
                CryptoTracker
              </Text>
            </HStack>
          </Link>
        </Flex>

        {/* Desktop Navigation */}
        <Flex alignItems="center" display={{ base: 'none', md: 'flex' }}>
          <Stack direction="row" spacing={4}>
            {isAuthenticated ? (
              <>
                <Button
                  as={Link}
                  to="/dashboard"
                  variant="ghost"
                  leftIcon={<FiHome />}
                  colorScheme="blue"
                >
                  Dashboard
                </Button>
                <Button
                  as={Link}
                  to="/search"
                  variant="ghost"
                  leftIcon={<FiSearch />}
                >
                  Search
                </Button>
                <Button
                  as={Link}
                  to="/history"
                  variant="ghost"
                  leftIcon={<FiClock />}
                >
                  History
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/" variant="ghost">
                  Home
                </Button>
                <Button as={Link} to="/login" colorScheme="blue">
                  Sign In
                </Button>
              </>
            )}
          </Stack>
        </Flex>

        {/* Right side - Theme toggle and User menu */}
        <Flex alignItems="center" gap={2}>
          {/* Theme Toggle */}
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />

          {isAuthenticated && user ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Avatar size="sm" name={user.name} src={user.avatar} />
              </MenuButton>
              <MenuList alignItems="center">
                <Center>
                  <Avatar size="lg" name={user.name} src={user.avatar} mb={2} />
                </Center>
                <Center>
                  <Text fontSize="sm" fontWeight="semibold">
                    {user.name}
                  </Text>
                </Center>
                <Center>
                  <Badge colorScheme="blue" variant="subtle">
                    {user.role || 'User'}
                  </Badge>
                </Center>
                <MenuDivider />
                <MenuItem icon={<FiUser />} as={Link} to="/profile">
                  Profile Settings
                </MenuItem>
                <MenuItem icon={<FiClock />} as={Link} to="/history">
                  Search History
                </MenuItem>
                <MenuDivider />
                <MenuItem icon={<FiLogOut />} onClick={handleLogout} color="red.500">
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          ) : null}

          {/* Mobile menu button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={toggleMobileMenu}
            icon={mobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="ghost"
            aria-label="Toggle navigation"
          />
        </Flex>
      </Flex>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <Box
          pb={4}
          display={{ md: 'none' }}
          bg={bgColor}
          borderTop={1}
          borderStyle="solid"
          borderColor={borderColor}
        >
          <Stack spacing={4} p={4}>
            {isAuthenticated ? (
              <>
                <Button
                  as={Link}
                  to="/dashboard"
                  variant="ghost"
                  leftIcon={<FiHome />}
                  w="full"
                  justifyContent="flex-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Button>
                <Button
                  as={Link}
                  to="/search"
                  variant="ghost"
                  leftIcon={<FiSearch />}
                  w="full"
                  justifyContent="flex-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Search
                </Button>
                <Button
                  as={Link}
                  to="/history"
                  variant="ghost"
                  leftIcon={<FiClock />}
                  w="full"
                  justifyContent="flex-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  History
                </Button>
                <Button
                  variant="ghost"
                  leftIcon={<FiUser />}
                  w="full"
                  justifyContent="flex-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  leftIcon={<FiLogOut />}
                  w="full"
                  justifyContent="flex-start"
                  color="red.500"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/" variant="ghost" w="full" justifyContent="flex-start">
                  Home
                </Button>
                <Button
                  as={Link}
                  to="/login"
                  colorScheme="blue"
                  w="full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Button>
              </>
            )}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Header;