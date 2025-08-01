'use client';

import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  InputBase,
  Fade
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useState } from 'react';

const mockUser = {
  name: 'Chang Em',
  avatarUrl: '/avatar.jpg',
  role: 'Admin'
};

const mockNotifications = [
  'Khách hàng mới vừa bốc số',
  'Sự cố hệ thống được ghi nhận',
  'Nhân viên A hoàn tất lượt chụp'
];

export default function PrivateHeader({ onDrawerToggle }: { onDrawerToggle: () => void }) {
  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" onClick={onDrawerToggle} sx={{ mr: 2, display: { xs: 'inline-flex', md: 'none' }, }} >
        <MenuIcon />
      </IconButton>

      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Bảng Điều Phối
      </Typography>

      {showSearch && (
        <InputBase
          placeholder="Tìm kiếm..."
          sx={{ bgcolor: 'grey.100', px: 2, borderRadius: 1, mr: 2 }}
        />
      )}

      <IconButton color="inherit" onClick={() => setShowSearch(!showSearch)}>
        <SearchIcon />
      </IconButton>

      <IconButton color="inherit" onClick={handleNotificationClick}>
        <Badge badgeContent={3} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} TransitionComponent={Fade}>
        {mockNotifications.map((msg, index) => (
          <MenuItem key={index}>{msg}</MenuItem>
        ))}
      </Menu>

      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
        <Avatar src={mockUser.avatarUrl} sx={{ width: 32, height: 32, mr: 1 }} />
        <Typography variant="body2">{`${mockUser.role} - ${mockUser.name}`}</Typography>
      </Box>
    </Toolbar>
  );
}
