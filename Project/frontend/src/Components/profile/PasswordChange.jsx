import { useState } from 'react';
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
import { isValidPassword } from '../../utils/validators';

export default function PasswordChange() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { changePassword } = useProfile();
  const toast = useToast();

  const validate = () => {
    const newErrors = {};
    if (!formData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }
    if (!isValidPassword(formData.newPassword)) {
      newErrors.newPassword = 'Password must be at least 6 characters';
    }
    if (formData.newPassword !== formData.confirmPassword) {
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
      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });
      toast({
        title: 'Password changed',
        status: 'success',
        duration: 3000,
      });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast({
        title: 'Change failed',
        description: error.message,
        status: 'error',
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" p={6} borderWidth={1} borderRadius="lg">
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <Heading size="md">Change Password</Heading>

        <FormControl isInvalid={errors.currentPassword}>
          <FormLabel>Current Password</FormLabel>
          <Input
            type="password"
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
          />
          <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.newPassword}>
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
          />
          <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.confirmPassword}>
          <FormLabel>Confirm New Password</FormLabel>
          <Input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          />
          <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={loading}
        >
          Change Password
        </Button>
      </VStack>
    </Box>
  );
}