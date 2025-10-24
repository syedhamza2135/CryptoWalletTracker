import { useState, useEffect } from 'react';
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
} from '@chakra-ui/react';
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
      setFormData({ name: profile.name, email: profile.email });
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

  if (loading) return null;

  return (
    <Box maxW="md" p={6} borderWidth={1} borderRadius="lg">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading size="md">Profile Information</Heading>

        <FormControl isInvalid={errors.name}>
          <FormLabel>Name</FormLabel>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <FormErrorMessage>{errors.name}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={submitting}
        >
          Update Profile
        </Button>
      </VStack>
    </Box>
  );
}