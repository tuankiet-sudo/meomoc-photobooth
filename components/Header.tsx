"use client"; 

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';
import Link from 'next/link';
import MenuIcon from '@mui/icons-material/Menu';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Các Booth Xinh', path: '/booking' },
    // { name: 'Giá Yêu Thương', path: '/pricing' },
    // { name: 'Ảnh Lung Linh', path: '/gallery' },
    // { name: 'Hú Tụi Tui', path: '/contact' }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', bgcolor: 'background.paper', height: '100%' }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', my: 2 }}>
            <Link href="/booking" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component="img"
                  src="/Logo.png"
                  alt="Logo"
                  sx={{ 
                    height: { xs: '32px', sm: '32px' },
                    width: 'auto'
                  }}
                />
                <Box
                  component="img"
                  src="/Name.png"
                  alt="Website Name"
                  sx={{ 
                    height: { xs: '20px', sm: '20px' },
                    width: 'auto'
                  }}
                />
              </Box>
            </Link>
          </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar component="nav" position="sticky" sx={{ 
        bgcolor: '#f1e9d2',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        color: 'text.primary'
      }}>
        <Toolbar>
          {/* Left Spacer */}
          <Box sx={{ flex: 1, display: 'flex' }} />

          {/* Centered Logo and Name */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <Link href="/booking" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  component="img"
                  src="/Logo.png"
                  alt="Logo"
                  sx={{ 
                    height: { xs: '32px', sm: '32px' },
                    width: 'auto'
                  }}
                />
                <Box
                  component="img"
                  src="/Name.png"
                  alt="Website Name"
                  sx={{ 
                    height: { xs: '20px', sm: '20px' },
                    width: 'auto'
                  }}
                />
              </Box>
            </Link>
          </Box>
          
          {/* Right Navigation */}
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box>
                {navItems.map((item) => (
                  <Button 
                    key={item.name} 
                    sx={{ 
                      color: 'text.primary',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        color: 'primary.main',
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};

export default Header;