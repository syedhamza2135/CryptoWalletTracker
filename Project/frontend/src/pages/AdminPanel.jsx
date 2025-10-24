import { Container, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Dashboard from '../components/admin/Dashboard';
import UserManagement from '../components/admin/UserManagement';
import Analytics from '../components/admin/Analytics';

export default function AdminPanel() {
  return (
    <Container maxW="container.xl" py={8}>
      <Tabs colorScheme="blue">
        <TabList>
          <Tab>Dashboard</Tab>
          <Tab>Users</Tab>
          <Tab>Analytics</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Dashboard />
          </TabPanel>
          <TabPanel>
            <UserManagement />
          </TabPanel>
          <TabPanel>
            <Analytics />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}