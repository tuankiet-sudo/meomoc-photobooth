'use client';

import { Container, Typography, Box, Button } from '@mui/material';

export default function GetNumberPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Lấy số thứ tự
      </Typography>
      <Typography variant="body1" gutterBottom>
        Vui lòng nhấn nút bên dưới để lấy số thứ tự chụp ảnh. Số thứ tự của bạn sẽ được hiển thị và gửi về email hoặc QR code.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" size="large">
          Lấy số ngay
        </Button>
      </Box>
    </Container>
  );
}
