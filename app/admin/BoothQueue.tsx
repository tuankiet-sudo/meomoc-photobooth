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
    customer_phone: string | null;
  }[];
}

export function BoothQueue({ booth }: { booth: BoothData }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  console.log(booth);

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
      <Typography variant="h5" component="h2" color={booth.name === "OverBeann" ? "#380c0f" : booth.name === "Forest Winkk" ? "#00b14f" : "#880000"} gutterBottom>
        {booth.name}
      </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

            <Typography variant="body1">Đang phục vụ:</Typography>

            <Chip

              label={currentOrdinal.toString().padStart(3, "0")}

              color="primary"

              sx={{ fontWeight: "bold" }}

            />

        </Box>

        <Box sx={{ textAlign: 'right' }}>

            <Typography variant="body1">

              {booth.queue.length} người đang chờ

            </Typography>

        </Box>

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
      <Box sx={booth.queue.length > 10 ? { 

          maxHeight: 300, 

          overflowY: 'auto' 

        } : {}}>
        <List dense>
          {booth.queue.map((entry, index) => {
            const customerName = entry.customer_name || "Khách vãng lai";
            console.log(`Queue Entry: ${entry.ordinal_number} - ${customerName} | Phone: ${entry.customer_phone || "N/A"}`);
            
            return (
              <ListItem
                key={entry.id}
                divider
                sx={{ bgcolor: index === 0 ? "action.hover" : "transparent" }}
              >
                <ListItemText
                  primary={`${entry.ordinal_number}. ${customerName} | SĐT: ${entry.customer_phone || "Không có"}`}
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