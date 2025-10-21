import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  VStack,
  HStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuthContext } from '../../Context/AuthContext';
import useForm from '../../Hooks/useForm';
import { validationRules } from '../../Utils/validation';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuthContext();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  // Form validation schema
  const validationSchema = {
    name: [validationRules.required],
    email: [validationRules.required, validationRules.email],
    password: [validationRules.required, validationRules.password],
    confirmPassword: [validationRules.required, validationRules.confirmPassword('password')]
  };

  const {
    // eslint-disable-next-line no-unused-vars
    values, // Used indirectly by handleSubmit to pass form data to onSubmit
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema
  });

  const onSubmit = async (formData) => {
    setAlertMessage(null);

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      setAlertMessage({
        type: 'success',
        message: response.message || 'Registration successful! Please login.'
      });

      // Redirect to login after successful registration
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      setAlertMessage({
        type: 'error',
        message: error.response?.data?.message || 'Registration failed'
      });
    }
  };

  return (
    <Container maxW="md" py={12}>
      <Card>
        <CardBody>
          <VStack spacing={6}>
            <VStack spacing={2} textAlign="center">
              <Heading size="lg" color="blue.600">
                ₿ Create Account
              </Heading>
              <Text color="gray.600">
                Join CryptoTracker to monitor your wallet activity
              </Text>
            </VStack>

            {alertMessage && (
              <Alert status={alertMessage.type} borderRadius="md">
                <AlertIcon />
                <AlertDescription>{alertMessage.message}</AlertDescription>
              </Alert>
            )}

            <Box w="full" as="form" onSubmit={handleSubmit(onSubmit)}>
              <VStack spacing={4}>
                {/* Name Field */}
                <FormControl isInvalid={touched.name && errors.name}>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    {...getFieldProps('name')}
                    type="text"
                    placeholder="Enter your full name"
                    size="lg"
                  />
                  {touched.name && errors.name && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.name}
                    </Text>
                  )}
                </FormControl>

                {/* Email Field */}
                <FormControl isInvalid={touched.email && errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...getFieldProps('email')}
                    type="email"
                    placeholder="Enter your email"
                    size="lg"
                  />
                  {touched.email && errors.email && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.email}
                    </Text>
                  )}
                </FormControl>

                {/* Password Field */}
                <FormControl isInvalid={touched.password && errors.password}>
                  <FormLabel>Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      {...getFieldProps('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {touched.password && errors.password && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.password}
                    </Text>
                  )}
                </FormControl>

                {/* Confirm Password Field */}
                <FormControl isInvalid={touched.confirmPassword && errors.confirmPassword}>
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup size="lg">
                    <Input
                      {...getFieldProps('confirmPassword')}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                    />
                    <InputRightElement>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </FormControl>

                {/* Submit Button */}
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  isLoading={isSubmitting || loading}
                  loadingText="Creating account..."
                >
                  Create Account
                </Button>
              </VStack>
            </Box>

            {/* Login Link */}
            <HStack spacing={1}>
              <Text color="gray.600">Already have an account?</Text>
              <ChakraLink as={Link} to="/login" color="blue.500" fontWeight="medium">
                Sign in
              </ChakraLink>
            </HStack>
          </VStack>
        </CardBody>
      </Card>
    </Container>
  );
};

export default RegisterForm;