import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import * as Yup from 'yup';

type FormValuesProps = {
  Password?: string;
  afterSubmit?: string;
};

type Props = {
  dataUser: any;
  onClose: VoidFunction;
  selectedList: any[];
};
export default function ResetPasswordDialog({ dataUser, onClose, selectedList }: Props) {
  const password = useBoolean();
  const confirmPassword = useBoolean();

  const UserGroupRequired = Yup.object().shape({
    Password: Yup.string().required('Password is required'),
    ConfirmPassword: Yup.string().required('Confirm Password is required')
  });

  const defaultValues = {
    Password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(UserGroupRequired),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    console.log(selectedList, data);
  };

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUser]);

  if (!dataUser) {
    return null;
  }

  return (
    <Dialog
      fullWidth
      open
      PaperProps={{ sx: { borderRadius: '8px !important' } }}
      onClose={onClose}
    >
      <DialogTitle sx={{ pb: 0, pt: 2 }}>Reset Password</DialogTitle>
      <Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ mb: 2, padding: '16px !important' }}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
            {!!errors.root && <Alert severity="success">{errors.root.message}</Alert>}

            <RHFTextField
              name="Password"
              label="Password"
              type={password.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              name="ConfirmPassword"
              label="Confirm password"
              type={confirmPassword.value ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={confirmPassword.onToggle} edge="end">
                      <Iconify
                        icon={confirmPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Box sx={{ mb: 3, ml: 2 }}>
            <LoadingButton size="medium" type="submit" variant="contained" loading={isSubmitting}>
              Reset
            </LoadingButton>
            <Button sx={{ ml: 3 }} variant="outlined" color="error" size="medium" onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </FormProvider>
      </Box>
    </Dialog>
  );
}
