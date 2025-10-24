import { Container } from '@chakra-ui/react';
import SearchHistory from '../components/history/SearchHistory';

export default function History() {
  return (
    <Container maxW="container.xl" py={8}>
      <SearchHistory />
    </Container>
  );
}