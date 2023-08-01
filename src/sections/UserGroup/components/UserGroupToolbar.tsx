import {
  Fab,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Tooltip
} from '@mui/material';
import { m } from 'framer-motion';
import { useCallback, useState } from 'react';
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import ResetPasswordDialog from './ResetPasswordDialog';
import UserGroupDialog from './UserGroupDialog';

type Props = {
  selectedList: any[];
};

const defaultUserGroup = {
  id: '',
  Name: '',
  Email: '',
  Type: '',
  Active: false,
  password: '',
};

export default function UserGroupToolbar({ selectedList }: Props) {
  // ================================================ DIALOG ===================================================
  const [dialogData, setDialogData] = useState<any | undefined>(undefined);

  const handleCloseDialog = useCallback(() => {
    setDialogData(undefined);
  }, []);

  const handleCreate = () => {
    setDialogData(defaultUserGroup);
  };

  const [dialogUserData, setDialogUserData] = useState<any | undefined>(undefined);

  const handleCloseUserDialog = useCallback(() => {
    setDialogUserData(undefined);
  }, []);

  const handleOpenModalResetPass = () => {
    setDialogUserData(defaultUserGroup);
  };
  // ================================================ POPEVER ADD USER/GROUP ===================================================
  const [type, setType] = useState<'User' | 'Group'>('User');
  const popover = usePopover();

  const handleChangePopeverUser = useCallback(() => {
    handleCreate();
    setType('User');
    popover.onClose();
  }, [popover]);

  const handleChangePopeverGroup = useCallback(() => {
    handleCreate();
    setType('Group');
    popover.onClose();
  }, [popover]);

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          pr: { xs: 2.5, md: 1 },
        }}
      >
        <Tooltip title="Add new User/Group" arrow>
          <IconButton
            size="medium"
            color="inherit"
            component={m.button}
            whileTap="tap"
            whileHover="hover"
            variants={varHover(1.1, 0.95) || varHover()}
            onClick={popover.onOpen}
            sx={{
              backgroundColor: 'primary.main',
              borderRadius: '50%',
              color: '#fff',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            <Iconify icon="mdi:plus" width={24} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Reset Password" arrow>
          <Fab
            key="password-reset"
            component={m.button}
            whileTap="tap"
            whileHover="hover"
            variants={varHover(1.1, 0.95) || varHover()}
            variant="extended"
            size="medium"
            color="inherit"
            onClick={() => {
              handleOpenModalResetPass();
            }}
            disabled={selectedList.length === 0}
          >
            <Iconify icon="mdi:password-reset" width={36} />
            Reset
          </Fab>
        </Tooltip>

        <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 120 }}>
          <MenuItem key="user" onClick={handleChangePopeverUser}>
            <Iconify icon="mdi:account-plus" sx={{ borderRadius: 0.65, width: 28 }} />
            User
          </MenuItem>
          <MenuItem key="group" onClick={handleChangePopeverGroup}>
            <Iconify icon="mdi:account-group" sx={{ borderRadius: 0.65, width: 28 }} />
            Group
          </MenuItem>
        </CustomPopover>
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            // value={filters.name}
            // onChange={handleFilterName}
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
      <ResetPasswordDialog
        dataUser={dialogUserData}
        onClose={handleCloseUserDialog}
        selectedList={selectedList}
      />
      <UserGroupDialog dataUserGroup={dialogData} onClose={handleCloseDialog} type={type} />
    </>
  );
}
