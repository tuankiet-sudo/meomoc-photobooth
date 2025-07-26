import { supabaseAdmin } from "@/utils/supabase/admin";
import { Box, Typography, Container } from "@mui/material";
import { AdminDashboard } from "./AdminDashboard"; // <-- Import the new component

export const dynamic = 'force-dynamic';

async function getInitialAdminData() {
  const { data, error } = await supabaseAdmin.rpc('get_queue_data');

  if (error) {
    console.error("RPC Error:", error);
    throw new Error("Could not fetch admin data.");
  }

  // Group the flat data by booth
  const boothsMap = new Map();
  for (const row of data) {
    if (!boothsMap.has(row.booth_id)) {
      boothsMap.set(row.booth_id, {
        id: row.booth_id,
        name: row.booth_name,
        current_customer_ordinal: row.current_customer_ordinal,
        queue: [],
      });
    }
    if (row.queue_entry_id) {
      boothsMap.get(row.booth_id).queue.push({
        id: row.queue_entry_id,
        ordinal_number: row.queue_ordinal_number,
        customer_name: row.customer_name,
        customer_phone: row.customer_phone,
      });
    }
  }
  return Array.from(boothsMap.values());
}

export default async function AdminPage() {
  const initialData = await getInitialAdminData();

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom>
          Trang Quản Trị
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Quản lý hàng chờ các booth
        </Typography>
        
        {/* Pass initial data to the client component */}
        <AdminDashboard initialBooths={initialData} />
      </Container>
    </Box>
  );
}