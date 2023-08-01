import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';
// components
import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  settings: icon('ic_settings'),
  systemConfiguration: icon('ic_system_configuration'),
  applicationPermission: icon('ic_application_permission'),
  userGroup: icon('ic_user_group'),
  roleManagement: icon('ic_user-role'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      {
        subheader: 'management',
        items: [
          { title: 'Application Permission', path: paths.dashboard.root, icon: ICONS.applicationPermission },
          { title: 'User & Group', path: paths.dashboard.userGroup, icon: ICONS.userGroup },
          { title: 'Role Management', path: paths.dashboard.roleManagement, icon: ICONS.roleManagement },
        ],
      },
      
    ],
    []
  );

  return data;
}
