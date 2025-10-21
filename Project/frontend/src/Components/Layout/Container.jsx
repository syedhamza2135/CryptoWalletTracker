import { Container as ChakraContainer, useColorModeValue } from '@chakra-ui/react';

const Container = ({ children, ...props }) => {
  return (
    <ChakraContainer
      maxW="7xl"
      px={4}
      py={8}
      bg={useColorModeValue('white', 'gray.800')}
      minH="calc(100vh - 64px - 200px)" // Account for header and footer
      {...props}
    >
      {children}
    </ChakraContainer>
  );
};

export default Container;