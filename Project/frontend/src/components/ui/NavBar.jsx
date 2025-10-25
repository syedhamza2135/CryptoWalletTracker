import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Flex,
  Button,
  HStack,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Container,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Badge,
  Avatar,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  ChevronDown,
  Menu as MenuIcon,
  Search,
  History,
  BarChart3,
  User,
  LogOut,
  Home,
  Settings,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from '../../hooks/useHistory';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { history } = useHistory();
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: Home },
    { path: '/wallet-search', label: 'Search', icon: Search },
    { path: '/history', label: 'History', icon: History },
    ...(isAdmin() ? [{ path: '/admin', label: 'Admin', icon: Shield }] : []),
  ];

  const NavLink = ({ to, children, icon: Icon, onClick, ...props }) => (
    <Button
      as={RouterLink}
      to={to}
      variant="ghost"
      color="white"
      bg={isActive(to) ? 'whiteAlpha.200' : 'transparent'}
      _hover={{ bg: 'whiteAlpha.300' }}
      leftIcon={Icon && <Icon size={16} />}
      onClick={onClick}
      justifyContent="flex-start"
      w="full"
      {...props}
    >
      {children}
    </Button>
  );

  return (
    <>
      <Box
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        color="white"
        py={3}
        shadow="lg"
        position="sticky"
        top={0}
        zIndex={1000}
      >
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            {/* Logo/Brand */}
            <HStack spacing={3}>
              <Box
                w={8}
                h={8}
                bg="white"
                borderRadius="md"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="lg" fontWeight="bold" color="purple.600">
                  ₿
                </Text>
              </Box>
              <Text
                fontSize="xl"
                fontWeight="bold"
                as={RouterLink}
                to="/dashboard"
                _hover={{ textDecoration: 'none', opacity: 0.8 }}
              >
                BTC Tracker
              </Text>
            </HStack>

            {/* Desktop Navigation */}
            {user && (
              <HStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
                {navItems.map((item) => (
                  <NavLink key={item.path} to={item.path} icon={item.icon}>
                    {item.label}
                  </NavLink>
                ))}
              </HStack>
            )}

            {/* Right Side */}
            <HStack spacing={4}>
              {user && (
                <>
                  {/* Recent Searches Badge */}
                  <Box display={{ base: 'none', md: 'block' }}>
                    <Badge
                      colorScheme="orange"
                      variant="subtle"
                      px={2}
                      py={1}
                      borderRadius="full"
                    >
                      {history.length} searches
                    </Badge>
                  </Box>

                  {/* User Menu */}
                  <Menu>
                    <MenuButton
                      as={Button}
                      variant="ghost"
                      color="white"
                      _hover={{ bg: 'whiteAlpha.200' }}
                      px={3}
                    >
                      <HStack spacing={2}>
                        <Avatar
                          size="sm"
                          name={user.name}
                          bg="whiteAlpha.300"
                          color="white"
                        />
                        <VStack spacing={0} align="start" display={{ base: 'none', md: 'flex' }}>
                          <Text fontSize="sm" fontWeight="semibold">
                            {user.name}
                          </Text>
                          <Text fontSize="xs" opacity={0.8}>
                            {user.role}
                          </Text>
                        </VStack>
                        <ChevronDown size={16} />
                      </HStack>
                    </MenuButton>
                    <MenuList color="gray.800" shadow="xl">
                      <MenuItem as={RouterLink} to="/profile" icon={<User size={16} />}>
                        Profile Settings
                      </MenuItem>
                      <MenuItem onClick={handleLogout} icon={<LogOut size={16} />} color="red.600">
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </>
              )}

              {!user && (
                <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
                  <Button as={RouterLink} to="/login" variant="ghost" color="white">
                    Login
                  </Button>
                  <Button as={RouterLink} to="/register" colorScheme="whiteAlpha" size="sm">
                    Sign Up
                  </Button>
                </HStack>
              )}

              {/* Mobile Menu Button */}
              {user && (
                <IconButton
                  display={{ base: 'flex', lg: 'none' }}
                  icon={<MenuIcon size={20} />}
                  variant="ghost"
                  color="white"
                  onClick={onOpen}
                  aria-label="Open menu"
                />
              )}
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <HStack>
              <Avatar size="sm" name={user?.name} />
              <Box>
                <Text fontWeight="semibold">{user?.name}</Text>
                <Text fontSize="sm" color="gray.600">{user?.email}</Text>
              </Box>
            </HStack>
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing={2} align="stretch">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  icon={item.icon}
                  onClick={onClose}
                  justifyContent="flex-start"
                  color="gray.800"
                  _hover={{ bg: 'gray.100' }}
                >
                  {item.label}
                </NavLink>
              ))}
              <Box borderTopWidth="1px" pt={4} mt={4}>
                <NavLink
                  to="/profile"
                  icon={Settings}
                  onClick={onClose}
                  justifyContent="flex-start"
                  color="gray.800"
                  _hover={{ bg: 'gray.100' }}
                >
                  Profile Settings
                </NavLink>
                <Button
                  variant="ghost"
                  color="red.600"
                  justifyContent="flex-start"
                  w="full"
                  onClick={() => {
                    handleLogout();
                    onClose();
                  }}
                  leftIcon={<LogOut size={16} />}
                  _hover={{ bg: 'red.50' }}
                >
                  Logout
                </Button>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}