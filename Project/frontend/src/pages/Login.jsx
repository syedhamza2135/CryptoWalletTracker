import { Box, Container } from '@chakra-ui/react';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <Container maxW="container.xl" py={8}>
      <LoginForm />
    </Container>
  );
}