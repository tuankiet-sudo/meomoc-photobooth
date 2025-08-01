'use client';

import { Box, CssBaseline, Drawer, useMediaQuery, AppBar } from '@mui/material';
import { useState } from 'react';
import PrivateHeader from '@/app/(private)/PrivateHeader';
import PrivateSidebar from '@/app/(private)/PrivateSidebar';

import '@/app/globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const drawerWidth = 240;

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <html lang="vi" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider options={{ key: 'mui', enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />

                    <Drawer
                        variant={isMobile ? 'temporary' : 'permanent'}
                        open={isMobile ? mobileOpen : true}
                        onClose={handleDrawerToggle}
                        ModalProps={{ keepMounted: true }}
                        sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                        }}
                    >
                        <PrivateSidebar />
                    </Drawer>

                    <Box
                        component="main"
                        sx={{
                        flexGrow: 1,
                        width: { sm: `100%` },
                        }}
                    >
                        <AppBar
                        position="sticky"
                        color="inherit"
                        elevation={1}
                        sx={{ zIndex: theme.zIndex.drawer }}
                        >
                            <PrivateHeader onDrawerToggle={handleDrawerToggle} />
                        </AppBar>

                        <Box sx={{ p: 3 }}>{children}</Box>
                    </Box>
                </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}