"use client";

import {
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Chip
} from "@mui/material";
import { useRouter } from "next/navigation";

interface BoothData {
  id: string;
  name: string;
  current_customer_ordinal: number | null; // Allow null here
  queue: {
    id: string;
    ordinal_number: number;
    customers: { name: string | null } | null;
  }[];
}

export function BoothQueue({ booth }: { booth: BoothData }) {
  const router = useRouter();
  
  const handleNextCustomer = async () => {
    console.log("Calling next customer for booth:", booth.id);
    alert(`Đang gọi khách tiếp theo cho ${booth.name}! (Chức năng này cần API)`);
    router.refresh(); 
  };

  // --- FIX: Handle the null case for current_customer_ordinal ---
  const currentOrdinal = booth.current_customer_ordinal ?? 0;
  console.log("booth data:", booth);

  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 3, height: '100%' }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {booth.name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="body1">Đang phục vụ số:</Typography>
        <Chip 
            // Use the safe variable `currentOrdinal` here
            label={currentOrdinal.toString().padStart(3, '0')} 
            color="primary" 
            sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}
        />
      </Box>
      <Button 
        variant="contained" 
        fullWidth 
        sx={{ mb: 2 }}
        onClick={handleNextCustomer}
      >
        Gọi Người Tiếp Theo
      </Button>
      <Divider />
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
        Hàng chờ:
      </Typography>
      <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
        <List dense>
          {booth.queue.map((entry, index) => {
            const customerName = entry.customers 
              ? entry.customers.name 
              : 'Khách vãng lai';
            
            return (
              <ListItem 
                  key={entry.id} 
                  divider
                  sx={{ bgcolor: index === 0 ? 'action.hover' : 'transparent' }}
              >
                <ListItemText
                  primary={`${entry.ordinal_number}. ${customerName}`}
                  secondary={index === 0 ? 'Tiếp theo' : null}
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