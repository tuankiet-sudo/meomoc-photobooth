"use client";

import { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";

interface BoothData {
  id: string;
  name: string;
  current_customer_ordinal: number | null;
  queue: {
    id: string;
    ordinal_number: number;
    customer_name: string | null;
  }[];
}

export function BoothQueue({ booth }: { booth: BoothData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleNextCustomer = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/next-customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ booth_id: booth.id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Có lỗi xảy ra!");
      }

      // Refresh the page to show the updated queue
      router.refresh();

    } catch (error: any) {
      alert(error.message);
    } finally {
      // Re-enable the button even if there's an error
      setLoading(false);
    }
  };

  const currentOrdinal = booth.current_customer_ordinal ?? 0;

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3, height: "100%" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {booth.name}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Typography variant="body1">Đang phục vụ số:</Typography>
        <Chip
          label={currentOrdinal.toString().padStart(3, "0")}
          color="primary"
          sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
        />
      </Box>
      <Button
        variant="contained"
        fullWidth
        sx={{ mb: 2 }}
        onClick={handleNextCustomer}
        disabled={loading} // Disable button while loading
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Gọi Người Tiếp Theo'}
      </Button>
      <Divider />
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Hàng chờ:
      </Typography>
      <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
        <List dense>
          {booth.queue.map((entry, index) => {
            const customerName = entry.customer_name || "Khách vãng lai";
            
            return (
              <ListItem
                key={entry.id}
                divider
                sx={{ bgcolor: index === 0 ? "action.hover" : "transparent" }}
              >
                <ListItemText
                  primary={`${entry.ordinal_number}. ${customerName}`}
                  secondary={index === 0 ? "Tiếp theo" : null}
                />
              </ListItem>
            );
          })}
          {booth.queue.length === 0 && (
            <ListItem>
              <ListItemText primary="Hàng chờ trống!" />
            </ListItem>
          )}
        </List>
      </Box>
    </Paper>
  );
}