'use client';

import { Container, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        MeoMoc Photo Booth
      </Typography>
      <Typography variant="body1">
        Chào mừng bạn đến với hệ thống chụp ảnh tự động của MeoMoc. Hãy bắt đầu bằng việc lấy số thứ tự hoặc khám phá thêm về dịch vụ của chúng tôi.
      </Typography>
    </Container>
  );
}
