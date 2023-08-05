import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { useForm } from 'react-hook-form';
import { RHFTextField } from 'src/components/hook-form';
import FormProvider from 'src/components/hook-form/form-provider';
import * as Yup from 'yup';

type FormValuesProps = {
  name: string;
  descripton?: string;
  users?: string[];
  groups?: string[];
  coverUrl?: string;
  avatarUrl?: string;
  afterSubmit?: string;
};

type Props = {
  dataRole: any;
  onClose: VoidFunction;
};

export default function RoleDialog({ onClose, dataRole }: Props) {

  const defaultValues = {
    name: dataRole?.name || '',
    descripton: dataRole?.descripton || '',
    users: dataRole?.users || [],
    groups: dataRole?.groups || [],
    coverUrl: dataRole?.coverUrl || '',
    avatarUrl: dataRole?.avatarUrl || '',
  };

  const RoleRequired = Yup.object().shape({
    name: Yup.string().required('Name field is required!'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(RoleRequired),
    defaultValues,
  });
  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;
  const onSubmit = async (data: FormValuesProps) => {
    console.log(data);
  };
  if (!dataRole) {
    return null;
  }
  return (
    <Dialog
      fullWidth
      open
      PaperProps={{ sx: { borderRadius: '8px !important' } }}
      onClose={onClose}
    >
      <DialogTitle sx={{ pb: 0, pt: 2 }}>Create new role</DialogTitle>
      <Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} sx={{ mb: 2, padding: '16px !important' }}>
            {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
            {!!errors.root && <Alert severity="success">{errors.root.message}</Alert>}
            <RHFTextField
              name="name"
              label="Name"
              inputProps={{ sx: { fontSize: '16px' } }}
              InputProps={{
                sx: { bgcolor: '#fff' },
              }}
            />
            <RHFTextField
              name="descripton"
              label="Descripton"
              inputProps={{ sx: { fontSize: '16px' } }}
              InputProps={{
                sx: { bgcolor: '#fff' },
              }}
            />
            
          </Stack>
          <Box sx={{ mb: 3, ml: 2 }}>
            <LoadingButton size="medium" type="submit" variant="contained" loading={isSubmitting}>
              Save
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
