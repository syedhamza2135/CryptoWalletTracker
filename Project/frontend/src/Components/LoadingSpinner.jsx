import React from 'react';
import {
  Box,
  Spinner,
  Text,
  VStack,
  Center,
  useColorModeValue
} from '@chakra-ui/react';

/**
 * Loading spinner component with customizable size and message
 */
const LoadingSpinner = ({
  size = 'md',
  message = 'Loading...',
  fullScreen = false,
  ...props
}) => {
  const bgColor = useColorModeValue('white', 'gray.800');

  const spinnerContent = (
    <VStack spacing={4}>
      <Spinner
        size={size}
        color="blue.500"
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
      />
      {message && (
        <Text
          fontSize="sm"
          color="gray.600"
          textAlign="center"
        >
          {message}
        </Text>
      )}
    </VStack>
  );

  if (fullScreen) {
    return (
      <Center
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg={bgColor}
        zIndex={9999}
        {...props}
      >
        {spinnerContent}
      </Center>
    );
  }

  return (
    <Center p={8} {...props}>
      {spinnerContent}
    </Center>
  );
};

/**
 * Inline loading spinner for buttons and small areas
 */
export const InlineSpinner = ({ size = 'sm', ...props }) => (
  <Spinner
    size={size}
    color="blue.500"
    thickness="3px"
    speed="0.65s"
    {...props}
  />
);

/**
 * Skeleton loader for content areas
 */
export const ContentSkeleton = ({ lines = 3, ...props }) => {
  const skeletonLines = Array.from({ length: lines }, (_, i) => (
    <Box
      key={i}
      height="20px"
      bg="gray.200"
      borderRadius="md"
      mb={i < lines - 1 ? 3 : 0}
      className="skeleton"
    />
  ));

  return (
    <Box {...props}>
      {skeletonLines}
    </Box>
  );
};

export default LoadingSpinner;