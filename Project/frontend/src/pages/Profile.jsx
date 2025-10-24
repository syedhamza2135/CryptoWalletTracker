import { Container, VStack, Heading } from '@chakra-ui/react';
import ProfileForm from '../components/profile/ProfileForm';
import PasswordChange from '../components/profile/PasswordChange';

export default function Profile() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="xl">Profile Settings</Heading>
        <ProfileForm />
        <PasswordChange />
      </VStack>
    </Container>
  );
}