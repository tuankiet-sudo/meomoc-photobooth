"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, Container, CircularProgress, Paper, Divider, Chip } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import LoopIcon from '@mui/icons-material/Loop';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';

interface QueueStatus {
  ordinal_number: number;
  arrival_status: string;
  number_of_customers_before: number;
  estimated_wait_time: number;
  current_customer_ordinal: number;
}

// Helper function to format wait time
const formatWaitTime = (minutes: number) => {
  if (minutes < 1) return "Less than a minute";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);
  let result = "";
  if (hours > 0) {
    result += `${hours} hour${hours > 1 ? 's' : ''} `;
  }
  if (remainingMinutes > 0) {
    result += `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`;
  }
  return result.trim();
};

export default function StatusPage() {
  const params = useParams();
  const queue_entry_id = params.queue_entry_id;

  const [status, setStatus] = useState<QueueStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!queue_entry_id) return;

    const fetchStatus = async () => {
      try {
        const response = await fetch(`/api/queue/my-status/${queue_entry_id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Could not fetch status.");
        }
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

    fetchStatus(); // Initial fetch
    const intervalId = setInterval(fetchStatus, 3000); // Fetch every 3 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [queue_entry_id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: { xs: 3, md: 5 } }}>
      <Paper elevation={4} sx={{ p: {xs: 2, sm: 4}, borderRadius: 4, textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.85)' }}>
        <Typography variant="h5" component="h1" color="text.secondary">
          Your Queue Number
        </Typography>
        <Typography
          variant="h1"
          component="div"
          sx={{
            fontWeight: 700,
            color: '#007aff', // A nice blue color
            my: 2,
            fontSize: { xs: '6rem', sm: '8rem' },
          }}
        >
          {status?.ordinal_number.toString().padStart(3, '0')}
        </Typography>
        
        <Chip label={status?.arrival_status.toUpperCase() || 'WAITING'} color="primary" sx={{mb: 2}}/>
        
        <Divider sx={{ my: 2 }}>
            <Typography variant="caption">Current Status</Typography>
        </Divider>

        <Box>
            <Typography variant="h6" color="text.secondary">Current Number Being Served</Typography>
            <Typography variant="h4" component="p" fontWeight="bold">
                {Math.max(0, status?.current_customer_ordinal || 0).toString().padStart(3, '0')}
            </Typography>
        </Box>

        <Box sx={{ textAlign: 'left', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <AccessTimeIcon color="secondary" />
                <Typography variant="body1">
                    <strong>Estimated wait time:</strong> {formatWaitTime(status?.estimated_wait_time || 0)}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PeopleOutlineIcon color="secondary" />
                <Typography variant="body1">
                    <strong>People ahead of you:</strong> {status?.number_of_customers_before}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LoopIcon color="secondary" />
                <Typography variant="body1">
                    Automatically updates every 3 seconds
                </Typography>
            </Box>
        </Box>

      </Paper>
    </Container>
  );
}