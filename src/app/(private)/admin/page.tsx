'use client';

import { Container, Typography, Alert } from '@mui/material';

export default function AdminPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Trang Quản Trị
      </Typography>
      <Alert severity="warning">
        Khu vực quản lý dành cho Admin. Tại đây bạn có thể theo dõi thống kê, cấu hình hệ thống, và phân quyền cho nhân viên.
      </Alert>
    </Container>
  );
}
