import { Booth } from "./booth";
import { BookingForm } from "./booking-form";
import { Container, Grid, Typography, Box } from "@mui/material";

export default async function BookingPage() {
  const response = await fetch("http://localhost:3000/api/booths", {
    cache: "no-store",
  });
  const booths = (await response.json()).map((booth: any) => ({
    ...booth,
    images: [`/${booth.name}-1.jpg`, `/${booth.name}-2.jpg`],
  }));
  // Sort to bring "Overbeann" to the front
  booths.sort((a: any, b: any) => {
    if (a.name === 'OverBeann') return -1;
    if (b.name === 'OverBeann') return 1;
    return 0;
  });

  console.log("Booths data:", booths);

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
            gap: 3, // Reduced gap for a tighter feel with taller cards
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
                width: { xs: '70%', sm: '35%', md: '25%' }, // Adjusted widths for taller cards
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