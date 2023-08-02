'use client';

import Button from '@mui/material/Button';
// @mui
import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
// components
import { useSettingsContext } from 'src/components/settings';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import RoleCardList from './components/RoleCardList';

// ----------------------------------------------------------------------

const ROLES = [
  {
    id: '1',
    name: 'Admin',
    description: 'Can do anything',
    coverUrl: '/assets/background/overlay_2.jpg',
    avatarUrl: '/static/mock-images/avatars/avatar_default.jpg',
  }
]
export default function RoleManagementView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Role Management"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Role Management', href: paths.dashboard.roleManagement },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.roleManagement}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Role
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RoleCardList roles={ROLES} />
    </Container>
  );
}
