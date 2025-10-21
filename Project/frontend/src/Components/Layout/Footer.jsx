import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  Flex,
  Icon,
  Divider
} from '@chakra-ui/react';
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      mt="auto"
    >
      <Container as={Stack} maxW="6xl" py={10}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'flex-start' }}
          spacing={8}
        >
          {/* Brand Section */}
          <Stack spacing={4} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontSize="2xl" fontWeight="bold" color="blue.500">
              ₿ CryptoTracker
            </Text>
            <Text fontSize="sm" maxW="300px" textAlign={{ base: 'center', md: 'left' }}>
              Track and monitor cryptocurrency wallet activities with real-time data and comprehensive analytics.
            </Text>
          </Stack>

          {/* Links Section */}
          <Stack direction={{ base: 'column', md: 'row' }} spacing={8}>
            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Text fontWeight="semibold" fontSize="sm" mb={2}>
                Product
              </Text>
              <Link href="#" fontSize="sm">Features</Link>
              <Link href="#" fontSize="sm">API</Link>
              <Link href="#" fontSize="sm">Pricing</Link>
            </Stack>

            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Text fontWeight="semibold" fontSize="sm" mb={2}>
                Company
              </Text>
              <Link href="#" fontSize="sm">About</Link>
              <Link href="#" fontSize="sm">Blog</Link>
              <Link href="#" fontSize="sm">Careers</Link>
            </Stack>

            <Stack align={{ base: 'center', md: 'flex-start' }}>
              <Text fontWeight="semibold" fontSize="sm" mb={2}>
                Support
              </Text>
              <Link href="#" fontSize="sm">Help Center</Link>
              <Link href="#" fontSize="sm">Contact</Link>
              <Link href="#" fontSize="sm">Privacy</Link>
            </Stack>
          </Stack>
        </Flex>

        <Divider my={6} />

        {/* Bottom Section */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          spacing={4}
        >
          <Text fontSize="sm">
            © {currentYear} CryptoTracker. All rights reserved.
          </Text>

          <Stack direction="row" spacing={6}>
            <Link href="#" aria-label="GitHub">
              <Icon as={FiGithub} w={5} h={5} />
            </Link>
            <Link href="#" aria-label="Twitter">
              <Icon as={FiTwitter} w={5} h={5} />
            </Link>
            <Link href="#" aria-label="Email">
              <Icon as={FiMail} w={5} h={5} />
            </Link>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;