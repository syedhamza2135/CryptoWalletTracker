import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useAuth } from '../../hooks/useAuth';
import { isValidEmail } from '../../utils/validators';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const validate = () => {
    const newErrors = {};
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData);
      toast({
        title: 'Login successful',
        status: 'success',
        duration: 3000,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      bg="white"
      p={8}
      borderRadius="xl"
      boxShadow="2xl"
      w="full"
      maxW="md"
    >
      <VStack spacing={6} as="form" onSubmit={handleSubmit}>
        <VStack spacing={2}>
          <Heading size="lg" color="gray.800">Welcome Back</Heading>
          <Text color="gray.600" textAlign="center">
            Sign in to your account to continue
          </Text>
        </VStack>

        <VStack spacing={4} w="full">
          <FormControl isInvalid={errors.email}>
            <FormLabel color="gray.700" fontWeight="semibold">Email</FormLabel>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Enter your email"
              size="lg"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              _hover={{ borderColor: 'blue.300' }}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
            />
            <FormErrorMessage>{errors.email}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password}>
            <FormLabel color="gray.700" fontWeight="semibold">Password</FormLabel>
            <Input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="Enter your password"
              size="lg"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              _hover={{ borderColor: 'blue.300' }}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
            />
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          </FormControl>
        </VStack>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          size="lg"
          isLoading={loading}
          bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          _hover={{ bg: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)' }}
          color="white"
          fontWeight="semibold"
        >
          Sign In
        </Button>
      </VStack>
    </Box>
  );
}