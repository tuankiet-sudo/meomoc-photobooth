'use client';

import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { usePathname } from 'next/navigation';

export default function PrivateSidebar() {
  const pathname = usePathname();

  let pageTitle = '';
  if (pathname.includes('/staff')) {
    pageTitle = 'Trang Nhân Viên';
  } else if (pathname.includes('/admin')) {
    pageTitle = 'Trang Admin';
  }

  return (
    <List>
      <ListItemButton disabled>
        <ListItemText
          primary={pageTitle}
          slotProps={{primary: { variant: 'h6', color: "#000" } }}
        />
      </ListItemButton>
      <ListItemButton selected>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Bảng điều khiển" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Cài đặt hệ thống" />
      </ListItemButton>
    </List>
  );
}
