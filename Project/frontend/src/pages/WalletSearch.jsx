import { Container } from '@chakra-ui/react';
import WalletSearch from '../components/wallet/WalletSearch';

export default function WalletSearchPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <WalletSearch />
    </Container>
  );
}