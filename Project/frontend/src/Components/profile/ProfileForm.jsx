import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
  FormErrorMessage,
  Card,
  CardBody,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import { User, Mail, Save } from 'lucide-react';
import { useProfile } from '../../hooks/useProfile';
import { isValidEmail, isValidName } from '../../utils/validators';

export default function ProfileForm() {
  const { profile, loading, updateProfile } = useProfile();
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || ''
      });
    }
  }, [profile]);

  const validate = () => {
    const newErrors = {};
    if (!isValidName(formData.name)) {
      newErrors.name = 'Name must be 2-50 characters';
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await updateProfile(formData);
      toast({
        title: 'Profile updated',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Update failed',
        description: error.message,
        status: 'error',
        duration: 4000,
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !profile) {
    return (
      <Card bg="white" shadow="lg" borderRadius="xl">
        <CardBody p={8}>
          <Text textAlign="center" color="gray.500">Loading profile...</Text>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card
      bg="white"
      shadow="2xl"
      borderRadius="xl"
      border="1px solid"
      borderColor="gray.100"
      w="full"
    >
      <CardBody p={8}>
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
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
                  placeholder="Enter your email address"
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
          </VStack>

          <Button
            type="submit"
            bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            color="white"
            size="lg"
            width="full"
            isLoading={submitting}
            leftIcon={<Save size={18} />}
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
            Update Profile
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
}