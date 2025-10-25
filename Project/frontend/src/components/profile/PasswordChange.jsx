import { useState } from 'react';
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
import { Lock, Shield, Key } from 'lucide-react';
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
        title: 'Password changed successfully',
        status: 'success',
        duration: 3000,
      });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast({
        title: 'Password change failed',
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
    >
      <CardBody p={8}>
        <VStack spacing={6} as="form" onSubmit={handleSubmit}>
          <VStack spacing={2} textAlign="center" w="full">
            <Text fontSize="lg" fontWeight="semibold" color="gray.800">
              Change Password
            </Text>
            <Text color="gray.600" fontSize="sm">
              Keep your account secure with a strong password
            </Text>
          </VStack>

          <VStack spacing={4} w="full">
            <FormControl isInvalid={errors.currentPassword}>
              <FormLabel color="gray.700" fontWeight="semibold">
                Current Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Lock size={18} color="#718096" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Enter current password"
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
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
              <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.newPassword}>
              <FormLabel color="gray.700" fontWeight="semibold">
                New Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Key size={18} color="#718096" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
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
              <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.confirmPassword}>
              <FormLabel color="gray.700" fontWeight="semibold">
                Confirm New Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Shield size={18} color="#718096" />
                </InputLeftElement>
                <Input
                  type="password"
                  placeholder="Confirm new password"
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
            leftIcon={<Shield size={18} />}
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
            Change Password
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
}