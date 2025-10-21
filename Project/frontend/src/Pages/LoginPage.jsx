import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';
import {
  Box,
  Container,
  Card,
  CardBody,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Alert,
  AlertIcon,
  AlertDescription,
  Link as ChakraLink,
  VStack,
  HStack,
  IconButton,
  CloseButton
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    if (alertMessage) setAlertMessage(null);
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    
    return newErrors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertMessage(null);
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setLoading(true);
    
    try {
      await login(formData);
      
      setAlertMessage({
        type: 'success',
        message: 'Login successful!'
      });
      
      // Navigate immediately after login
      navigate('/dashboard');
      
    } catch (error) {
      setAlertMessage({
        type: 'error',
        message: error.response?.data?.message || 'Login failed'
      });
      
      if (error.response?.data?.errors) {
        const backendErrors = {};
        error.response.data.errors.forEach(err => {
          backendErrors[err.field] = err.message;
        });
        setErrors(backendErrors);
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(to-br, blue.50, gray.100)" 
      py={12} 
      px={4}
    >
      <Container maxW="md">
        <VStack spacing={8} align="stretch">
          
          {/* Header */}
          <Box textAlign="center">
            <Heading size="xl" mb={2}>Welcome Back</Heading>
            <Text color="gray.600">Sign in to your account to continue</Text>
          </Box>
          
          {/* Card */}
          <Card>
            <CardBody>
              {/* Alert */}
              {alertMessage && (
                <Alert 
                  status={alertMessage.type === 'success' ? 'success' : 'error'} 
                  mb={4}
                  borderRadius="md"
                >
                  <AlertDescription flex={1}>
                    {alertMessage.message}
                  </AlertDescription>
                  <CloseButton 
                    onClick={() => setAlertMessage(null)}
                    position="relative"
                    right={-1}
                    top={-1}
                  />
                </Alert>
              )}
              
              {/* Form */}
              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  
                  {/* Email */}
                  <FormControl isInvalid={errors.email} isRequired>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.email}
                      </Text>
                    )}
                  </FormControl>
                  
                  {/* Password */}
                  <FormControl isInvalid={errors.password} isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                      />
                      <InputRightElement>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        />
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <Text color="red.500" fontSize="sm" mt={1}>
                        {errors.password}
                      </Text>
                    )}
                  </FormControl>
                  
                  {/* Forgot Password */}
                  <Box w="100%" textAlign="right">
                    <ChakraLink 
                      as={Link} 
                      to="/forgot-password" 
                      fontSize="sm" 
                      color="blue.600"
                    >
                      Forgot password?
                    </ChakraLink>
                  </Box>
                  
                  {/* Submit */}
                  <Button
                    type="submit"
                    colorScheme="blue"
                    width="100%"
                    isLoading={loading}
                    loadingText="Signing in..."
                  >
                    Sign In
                  </Button>
                </VStack>
              </form>
              
              {/* Register Link */}
              <Text textAlign="center" mt={6} fontSize="sm" color="gray.600">
                Don't have an account?{' '}
                <ChakraLink as={Link} to="/register" color="blue.600" fontWeight="medium">
                  Create one now
                </ChakraLink>
              </Text>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
};

export default LoginPage;