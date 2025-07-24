import { supabaseAdmin } from "@/utils/supabase/admin";
import { Box, Typography, Container, Paper, Grid } from "@mui/material";
import { BoothQueue } from "./BoothQueue";

async function getQueueData() {
  // Fetch all active booths
  const { data: booths, error: boothsError } = await supabaseAdmin
    .from("booths")
    .select("id, name, current_customer_ordinal")
    .eq("is_active", true)
    .order("name");

  if (boothsError) throw new Error("Could not fetch booths.");

  // Fetch all waiting or in-progress queue entries for those booths
  const boothIds = booths.map((b) => b.id);
  const { data: entries, error: entriesError } = await supabaseAdmin
    .from("queue_entries")
    .select("id, booth_id, ordinal_number, customers(name)")
    .in("booth_id", boothIds)
    .in("status", ["waiting", "in_progress"])
    .order("ordinal_number", { ascending: true });
    
  if (entriesError) throw new Error("Could not fetch queue entries.");

  // Group entries by booth
  const queueData = booths.map(booth => ({
    ...booth,
    queue: entries.filter(entry => entry.booth_id === booth.id)
  }));

  return queueData;
}

export default async function AdminPage() {
  const queueData = await getQueueData();
  console.log("Queue Data:", queueData);

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
            <Grid size ={{ xs:12, md:6, lg:4}} key={booth.id}>
                <BoothQueue booth={booth} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}