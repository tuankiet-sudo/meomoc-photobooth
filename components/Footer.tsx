"use client";

import { Box, Container, Typography, IconButton, Link, Grid, Divider } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

// --- PLACEHOLDER DATA: Edit all your footer information here ---
const footerData = {
  address: "10 Đường Nguyễn Án, Phường 11, Quận 5, TP.HCM",
  phone: "0907 039 039",
  email: "meomoc.ptb@gmail.com",
  socials: {
    facebook: "https://www.facebook.com/profile.php?id=61577068217419",
    instagram: "https://www.instagram.com/meomoc.ptb/",
    tiktok: "https://www.tiktok.com/@meomoc.ptb",
    threads: "https://www.threads.com/@meomoc.ptb",
  },
  // --- ADD YOUR GOOGLE MAPS EMBED URL HERE ---
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.76254616725!2d106.6608344!3d10.7527751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f003c6b50bb%3A0x29b5d5f964860ce8!2zTcOITyBN4buQQyBQSE9UT0JPT1RI!5e0!3m2!1svi!2s!4v1753484889930!5m2!1svi!2s"
};

// SVG Icons for TikTok and Threads
const TikTokIcon = () => (
  <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.3-4.45-1.7-6.81.6-2.35 2.48-4.25 4.83-4.61 2.34-.37 4.73.12 6.46 1.76.74.71 1.25 1.67 1.41 2.64h-4.06c-.01-1.89.01-3.78-.02-5.66-.01-1.36.01-2.73-.02-4.1-.01-.11-.02-.22-.04-.33z"/>
  </svg>
);

const ThreadsIcon = () => (
    <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
        <path d="M14.1,8.6c0-1.2-0.9-2-2.1-2s-2.1,0.9-2.1,2c0,0.9,0.6,1.7,1.4,1.9c-0.1,0.1-0.2,0.1-0.2,0.2c-1.3,0.4-2.2,1.6-2.2,3 c0,1.7,1.4,3.1,3.1,3.1s3.1-1.4,3.1-3.1c0-1.4-0.9-2.6-2.2-3c-0.1,0-0.2-0.1-0.2-0.2C13.5,10.3,14.1,9.5,14.1,8.6z M12,15.6 c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,15.6,12,15.6z M12.9,9.5c-0.5,0-0.9-0.4-0.9-0.9s0.4-0.9,0.9-0.9s0.9,0.4,0.9,0.9 C13.8,9.1,13.4,9.5,12.9,9.5z M20,3H4C3.4,3,3,3.4,3,4v16c0,0.6,0.4,1,1,1h16c0.6,0,1-0.4,1-1V4C21,3.4,20.6,3,20,3z M18,18 H6c-0.6,0-1-0.4-1-1V6c0-0.6,0.4-1,1-1h12c0.6,0,1,0.4,1,1v11C19,17.6,18.6,18,18,18z"/>
    </svg>
);


const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', color: 'text.secondary', mt: 8 }}>
      <Container sx={{ py: 4 }}>
        <Grid container spacing={4} justifyContent="space-between">
          {/* Column 1: Logo and Name */}
          <Grid size={{xs: 12, sm: 4}}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box component="img" src="/Logo.png" alt="Logo" sx={{ height: 40, mr: 1.5 }} />
              <Box component="img" src="/Name.png" alt="Website Name" sx={{ height: 25 }} />
            </Box>
            <Typography variant="body2">
              Lưu giữ khoảnh khắc, tạo nên câu chuyện.
            </Typography>
          </Grid>

          {/* Column 2: Contact Information */}
          <Grid size={{xs: 12, sm: 4}}>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 2 }}>Liên Hệ</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>{footerData.address}</Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <Link href={`tel:${footerData.phone}`} color="inherit" underline="hover">
                SĐT: {footerData.phone}
              </Link>
            </Typography>
            <Typography variant="body2">
              <Link href={`mailto:${footerData.email}`} color="inherit" underline="hover">
                Email: {footerData.email}
              </Link>
            </Typography>
          </Grid>

          {/* Column 3: Social Media */}
          <Grid size={{xs: 12, sm: 4}}>
            <Typography variant="h6" sx={{ color: 'text.primary', mb: 1 }}>Theo Dõi Tụi Tui</Typography>
            <Box>
              <IconButton component="a" href={footerData.socials.facebook} target="_blank" aria-label="Facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton component="a" href={footerData.socials.instagram} target="_blank" aria-label="Instagram">
                <InstagramIcon />
              </IconButton>
              <IconButton component="a" href={footerData.socials.tiktok} target="_blank" aria-label="TikTok">
                <TikTokIcon />
              </IconButton>
              <IconButton component="a" href={footerData.socials.threads} target="_blank" aria-label="Threads">
                <ThreadsIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Grid size={{xs:12, md:8}}>
            <Box
              component="iframe"
              src={footerData.googleMapsEmbedUrl}
              width="100%"
              height="250"
              sx={{ border: 0, borderRadius: 2 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
        </Grid>

        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Mèo Mốc Photobooth. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;