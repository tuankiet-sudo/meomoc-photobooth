'use client';

import { Container, Typography, Alert } from '@mui/material';

export default function StaffPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>
        Trang Nhân Viên
      </Typography>
      <Alert severity="info">
        Đây là khu vực dành riêng cho nhân viên. Vui lòng đăng nhập để xem danh sách chờ, cập nhật trạng thái chụp hình và quản lý số thứ tự.
      </Alert>
    </Container>
  );
}
