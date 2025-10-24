import { Box, Container } from '@chakra-ui/react';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <Container maxW="container.xl" py={8}>
      <RegisterForm />
    </Container>
  );
}