import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { alpha, useTheme } from '@mui/material/styles';
import { AvatarShape } from 'src/assets/illustrations';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IRoleCard } from '../type/role';
import Image from '../../../components/image';

type Props = {
  role: IRoleCard;
};

export default function RoleCard({ role }: Props) {
  const theme = useTheme();
  const { name, description, coverUrl, avatarUrl } = role;

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Box sx={{ position: 'relative' }}>
        <AvatarShape
          sx={{
            left: 0,
            right: 0,
            zIndex: 10,
            mx: 'auto',
            bottom: -26,
            position: 'absolute',
          }}
        />
        <Avatar
          alt={name}
          src={avatarUrl}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />
        <Image
          src={coverUrl}
          alt={coverUrl}
          ratio="16/9"
          overlay={alpha(theme.palette.grey[900], 0.48)}
        />
      </Box>
      <ListItemText
        sx={{ mt: 5, mb: 1 }}
        primary={name}
        primaryTypographyProps={{ typography: 'subtitle1' }}
        secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
      />
      <Divider sx={{ borderStyle: 'dashed' }} />
      <Box>
        <Typography variant="caption" component="div" sx={{ mb: 2, mt: 2, color: '#666', fontSize: '14px' }}>
            Description: {description}
          </Typography>
      </Box>

    </Card>
  );
}
