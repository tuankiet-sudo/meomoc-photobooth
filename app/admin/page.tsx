import { supabaseAdmin } from "@/utils/supabase/admin";
import { Box, Typography, Container, Grid } from "@mui/material";
import { BoothQueue } from "./BoothQueue";

async function getAdminData() {
  // Call the new SQL function instead of doing complex selects
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
    // Only add queue entries if they exist (LEFT JOIN can produce nulls)
    if (row.queue_entry_id) {
      boothsMap.get(row.booth_id).queue.push({
        id: row.queue_entry_id,
        ordinal_number: row.queue_ordinal_number,
        customer_name: row.customer_name,
      });
    }
  }
  return Array.from(boothsMap.values());
}

export default async function AdminPage() {
  const queueData = await getAdminData();

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 4 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom>
          Trang Quản Trị
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Quản lý hàng chờ các booth
        </Typography>
        <Grid container spacing={4}>
          {queueData.map((booth) => (
            <Grid size={{xs:12, md:6, lg:4}} key={booth.id}>
              <BoothQueue booth={booth} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}