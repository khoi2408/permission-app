'use client';

import Button from '@mui/material/Button';
// @mui
import Container from '@mui/material/Container';
import { useCallback, useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import Iconify from 'src/components/iconify';
// components
import { useSettingsContext } from 'src/components/settings';
import { paths } from 'src/routes/paths';
import RoleCardList from './components/RoleCardList';
import RoleDialog from './components/RoleDialog';

// ----------------------------------------------------------------------

const ROLES = [
  {
    id: '111',
    name: 'Admin',
    description: 'Can do anything',
    coverUrl: '/assets/images/background/cover_1.jpg',
    avatarUrl: '/assets/images/avatar/avatar_14.jpg',
    users: ['111', '222', '444'],
    groups: []
  },
  {
    id: '222',
    name: 'User',
    description: 'Can do read only',
    coverUrl: '/assets/images/background/cover_2.jpg',
    avatarUrl: '/assets/images/avatar/avatar_4.jpg',
    users: ['111', '222', '444', '555', '666', '777', '888', '999'],
    groups: ['333', '000']
  },
]

const defaultRole = {
  id: '',
  name: '',
  description: '',
  coverUrl: '',
  avatarUrl: '',
  users: [],
  groups: []
};

export default function RoleManagementView() {
  
  const settings = useSettingsContext();

  // ================================== MODAL ==========================================
  const [updateData, setUpdateData] = useState<any | undefined>(undefined);
  const handleCloseDialog = useCallback(() => {
    setUpdateData(undefined);
  }, []);
  const handleCreateRole = (data: any) => {
    setUpdateData(defaultRole);
  }

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
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleCreateRole}
          >
            New Role
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <RoleDialog dataRole={updateData} onClose={handleCloseDialog} />
      <RoleCardList roles={ROLES} />
    </Container>
  );
}
