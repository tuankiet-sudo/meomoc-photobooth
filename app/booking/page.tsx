import { Booth } from "./booth";
import { BookingForm } from "./booking-form";
import { Container, Typography, Box } from "@mui/material";
import { supabaseAdmin } from "@/utils/supabase/admin"; // Import the admin client

export default async function BookingPage() {
  // Fetch data directly from Supabase instead of using a local fetch
  const { data, error } = await supabaseAdmin
    .from('booths')
    .select('id, name, estimated_session_duration_minutes')
    .eq('is_active', true)
    .order('name');

  if (error) {
    // Handle the error appropriately in a real application
    console.error("Failed to fetch booths:", error);
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">Could not load booth information. Please try again later.</Typography>
      </Box>
    );
  }

  let booths = data.map((booth: any) => ({
    ...booth,
    images: [`/${booth.name}-1.jpg`, `/${booth.name}-2.jpg`, `/${booth.name}-3.jpg`],
  }));

  // Sort to bring "Overbeann" to the front
  booths.sort((a: any, b: any) => {
    if (a.name === 'Overbeann') return -1;
    if (b.name === 'Overbeann') return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });


  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container sx={{ py: { xs: 3, md: 5 } }}>
        <Typography variant="h1" align="center" gutterBottom>
          Book a Photobooth
        </Typography>
        <Typography
          variant="h4"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 4 }}
        >
          Choose one of our amazing booths to capture your moments!
        </Typography>

        {/* --- Horizontal Sliding Display --- */}
        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            py: 2,
            gap: 3, 
            scrollSnapType: 'x mandatory',
            '&::-webkit-scrollbar': {
              height: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,0.2)',
              borderRadius: '4px',
            },
          }}
        >
          {booths.map((booth: any) => (
            <Box
              key={booth.id}
              sx={{
                flex: '0 0 auto',
                width: { xs: '70%', sm: '35%', md: '25%' }, 
                scrollSnapAlign: 'start',
              }}
            >
              <Booth booth={booth} />
            </Box>
          ))}
        </Box>
        {/* --- End of Horizontal Display --- */}


        <Box mt={5}>
          <BookingForm booths={booths} />
        </Box>
        
      </Container>
    </Box>
  );
}