'use client';

// @mui
import Container from '@mui/material/Container';
// components
import { Card } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import UserGroupList from './components/UserGroupList';

// ----------------------------------------------------------------------

export default function UserGroupView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ padding: '0px !important' }}>
      <CustomBreadcrumbs
        heading="User & Group Management"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User & Group Management', href: paths.dashboard.userGroup },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card sx={{ py: 1, px: 1, margin: 1, minHeight: '100%' }}>
        <UserGroupList />
      </Card>
    </Container>
  );
}
