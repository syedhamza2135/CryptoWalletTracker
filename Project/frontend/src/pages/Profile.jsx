import { Box, Container, VStack, Text, HStack, Divider } from '@chakra-ui/react';
import { User, Settings } from 'lucide-react';
import ProfileForm from '../components/profile/ProfileForm';
import PasswordChange from '../components/profile/PasswordChange';

export default function Profile() {
  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      py={8}
    >
      <Container maxW="4xl">
        <VStack spacing={8}>
          {/* Header */}
          <VStack spacing={4} textAlign="center">
            <Box
              w={20}
              h={20}
              bg="white"
              borderRadius="full"
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="2xl"
            >
              <User size={32} color="#667eea" />
            </Box>
            <VStack spacing={1}>
              <Text fontSize="3xl" fontWeight="bold" color="white">
                Profile Settings
              </Text>
              <Text color="whiteAlpha.800" fontSize="lg">
                Manage your account information and security
              </Text>
            </VStack>
          </VStack>

          {/* Profile Sections */}
          <VStack spacing={6} w="full" maxW="2xl">
            {/* Profile Information Section */}
            <Box w="full">
              <HStack spacing={3} mb={4}>
                <Box
                  p={2}
                  bg="whiteAlpha.200"
                  borderRadius="lg"
                  color="white"
                >
                  <User size={20} />
                </Box>
                <Text fontSize="xl" fontWeight="semibold" color="white">
                  Profile Information
                </Text>
              </HStack>
              <ProfileForm />
            </Box>

            <Divider borderColor="whiteAlpha.300" />

            {/* Security Section */}
            <Box w="full">
              <HStack spacing={3} mb={4}>
                <Box
                  p={2}
                  bg="whiteAlpha.200"
                  borderRadius="lg"
                  color="white"
                >
                  <Settings size={20} />
                </Box>
                <Text fontSize="xl" fontWeight="semibold" color="white">
                  Security Settings
                </Text>
              </HStack>
              <PasswordChange />
            </Box>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}