'use client';

// @mui
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// components
import { Card } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import UserGroupList from './components/UserGroupList';

// ----------------------------------------------------------------------

export default function UserGroupView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ padding: '0px !important' }}>
      <Typography variant="h4"> User & Group Management </Typography>
      <Card sx={{ py: 1, px: 1, margin: 1, minHeight: '100%' }}>
        <UserGroupList />
      </Card>
    </Container>
  );
}
