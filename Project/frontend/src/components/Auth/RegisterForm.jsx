import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  FormErrorMessage,
  Card,
  CardBody,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { User, Mail, Lock, Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { isValidEmail, isValidPassword, isValidName } from '../../utils/validators';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const validate = () => {
    const newErrors = {};
    if (!isValidName(formData.name)) {
      newErrors.name = 'Name must be 2-50 characters';
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!isValidPassword(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: error.message,
        status: 'error',
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      bg="white"
      shadow="2xl"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.100"
      w="full"
      maxW="md"
    >
      <CardBody p={8}>
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <VStack spacing={2} textAlign="center">
            <Heading size="lg" color="gray.800">
              Create Account
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Join the Bitcoin tracking community
            </Text>
          </VStack>

          <VStack spacing={4} w="full">
            <FormControl isInvalid={errors.name}>
              <FormLabel color="gray.700" fontWeight="semibold">
                Full Name
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <User size={18} color="#718096" />
                </InputLeftElement>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{ borderColor: 'purple.300' }}
                  _focus={{
                    borderColor: 'purple.500',
                    boxShadow: '0 0 0 1px #805AD5',
                    bg: 'white',
                  }}
                  size="lg"
                />
              </InputGroup>
              <FormErrorMessage>{errors.name}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email}>
              <FormLabel color="gray.700" fontWeight="semibold">
                Email Address
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Mail size={18} color="#718096" />
                </InputLeftElement>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{ borderColor: 'purple.300' }}
                  _focus={{
                    borderColor: 'purple.500',
                    boxShadow: '0 0 0 1px #805AD5',
                    bg: 'white',
                  }}
                  size="lg"
                />
              </InputGroup>
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.password}>
              <FormLabel color="gray.700" fontWeight="semibold">
                Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Lock size={18} color="#718096" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{ borderColor: 'purple.300' }}
                  _focus={{
                    borderColor: 'purple.500',
                    boxShadow: '0 0 0 1px #805AD5',
                    bg: 'white',
                  }}
                  size="lg"
                />
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.confirmPassword}>
              <FormLabel color="gray.700" fontWeight="semibold">
                Confirm Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Shield size={18} color="#718096" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  bg="gray.50"
                  border="1px solid"
                  borderColor="gray.200"
                  _hover={{ borderColor: 'purple.300' }}
                  _focus={{
                    borderColor: 'purple.500',
                    boxShadow: '0 0 0 1px #805AD5',
                    bg: 'white',
                  }}
                  size="lg"
                />
              </InputGroup>
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>
          </VStack>

          <Button
            type="submit"
            bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            color="white"
            size="lg"
            width="full"
            isLoading={loading}
            _hover={{
              bg: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
              transform: 'translateY(-1px)',
              boxShadow: 'lg',
            }}
            _active={{
              transform: 'translateY(0)',
            }}
            transition="all 0.2s"
          >
            Create Account
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
}