import '@/app/globals.css';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import { Paytone_One, Lora } from 'next/font/google';

const paytone = Paytone_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-paytone',
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lora',
});

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${paytone.variable} ${lora.variable}`}>
      <body>
        <AppRouterCacheProvider options={{ key: 'mui', enableCssLayer: true }}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
