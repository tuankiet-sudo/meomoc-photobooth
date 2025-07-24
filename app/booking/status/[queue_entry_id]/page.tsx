"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, Container, CircularProgress, Paper, Divider, Chip, TextField, Button } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LoopIcon from '@mui/icons-material/Loop';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


interface QueueStatus {
  ordinal_number: number;
  arrival_status: string;
  number_of_customers_before: number;
  estimated_wait_time: number;
  current_customer_ordinal: number;
}

const formatWaitTime = (minutes: number) => {
  if (minutes < 1) return "Chưa tới 1 phút";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  let result = "";
  if (hours > 0) result += `${hours} giờ `;
  if (remainingMinutes > 0) result += `${remainingMinutes} phút`;
  return result.trim();
};

const statusToVietnamese = (status: string) => {
    const lowerCaseStatus = status.toLowerCase();
    switch(lowerCaseStatus) {
        case 'waiting':
            return 'ĐANG CHỜ';
        case 'in_progress':
            return 'TỚI LƯỢT RỒI';
        case 'completed':
            return 'ĐÃ XONG';
        default:
            return 'CHỜ XÍU';
    }
}

export default function StatusPage() {
  const params = useParams();
  const queue_entry_id = params.queue_entry_id;

  const [status, setStatus] = useState<QueueStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }

    if (!queue_entry_id) return;

    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/queue/my-status/${queue_entry_id}`);
        if (!response.ok) throw new Error("Huhu, không tải được trạng thái. Bạn F5 thử xem!");
        const data = await response.json();
        const current_customer_ordinal = data.ordinal_number - data.number_of_customers_before - 1;
        setStatus({ ...data, current_customer_ordinal });
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
    const intervalId = setInterval(fetchStatus, 3000);

    return () => clearInterval(intervalId);
  }, [queue_entry_id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Show "Copied!" message for 2 seconds
    });
  };

  if (loading) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><CircularProgress /></Box>;
  }

  if (error) {
    return <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"><Typography color="error">{error}</Typography></Box>;
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, md: 5 } }}>
      <Paper elevation={4} sx={{ p: {xs: 2, sm: 4}, borderRadius: 4, textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.85)' }}>
        <Typography variant="h5" component="h1" color="text.secondary">
          Số thứ tự của bạn đâyyy
        </Typography>
        <Typography variant="h1" component="div" sx={{ fontWeight: 700, color: '#007aff', my: 2, fontSize: { xs: '6rem', sm: '8rem' } }}>
          {status?.ordinal_number.toString().padStart(3, '0')}
        </Typography>
        
        <Chip label={statusToVietnamese(status?.arrival_status || '')} color="primary" sx={{mb: 2}}/>
        
        <Divider sx={{ my: 2 }}><Typography variant="caption">Tình hình hiện tại</Typography></Divider>

        <Box>
            <Typography variant="h6" color="text.secondary">Đang tới lượt số</Typography>
            <Typography variant="h4" component="p" fontWeight="bold">
                {Math.max(0, status?.current_customer_ordinal || 0).toString().padStart(3, '0')}
            </Typography>
        </Box>

        <Box sx={{ textAlign: 'left', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccessTimeIcon color="secondary" />
                <Typography variant="body1">
                    <strong>Đợi khoảng:</strong> {formatWaitTime(status?.estimated_wait_time || 0)}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PeopleOutlineIcon color="secondary" />
                <Typography variant="body1">
                    <strong>Phía trước còn:</strong> {status?.number_of_customers_before} người nữa thui
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LoopIcon color="secondary" />
                <Typography variant="body1">
                    Tụi tui tự làm mới mỗi 3 giây đó nha
                </Typography>
            </Box>
        </Box>
        
        {/* --- Shareable Link Box --- */}
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>
              Chia sẻ trang chờ này cho bạn bè!
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={currentUrl}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <Button 
                    variant="contained" 
                    onClick={handleCopyLink}
                    sx={{ width: 120, bgcolor: copied ? 'success.main' : 'primary.main' }}
                >
                    {copied ? 'Đã chép!' : 'Chép link'}
                </Button>
            </Box>
        </Box>

      </Paper>
    </Container>
  );
}