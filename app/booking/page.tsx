import { Booth } from "./booth";
import { BookingForm } from "./booking-form";
import { Container, Typography, Box } from "@mui/material";
import { supabaseAdmin } from "@/utils/supabase/admin";

export default async function BookingPage() {
  const { data, error } = await supabaseAdmin
    .from('booths')
    .select('id, name, estimated_session_duration_minutes')
    .eq('is_active', true)
    .order('name');

  if (error) {
    console.error("Failed to fetch booths:", error);
    return (
      <Box sx={{ p: 4 }}>
        <Typography color="error">Huhu, không tải được thông tin booth. Thử lại sau nha!</Typography>
      </Box>
    );
  }

  let booths = data.map((booth: any) => ({
    ...booth,
    images: [`/${booth.name}-1.jpg`, `/${booth.name}-2.jpg`],
  }));

  booths.sort((a: any, b: any) => {
    if (a.name === 'OverBeann') return -1;
    if (b.name === 'OverBeann') return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container sx={{ py: { xs: 3, md: 5 } }}>
        <Typography variant="h1" align="center" gutterBottom>
          Đặt Lịch Chụp Hình Nàooo!
        </Typography>
        <Typography
          variant="h4"
          align="center"
          color="text.secondary"
          fontWeight={450}
          sx={{ mb: 4 }}
        >
          Chọn một chiếc booth thật dễ thương để ghi lại khoảnh khắc của bạn nhé!
        </Typography>

        <Box
          sx={{
            display: 'flex',
            overflowX: 'auto',
            py: 2,
            gap: 3, 
            scrollSnapType: 'x mandatory',
            '&::-webkit-scrollbar': { height: '8px' },
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '4px' },
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

        <Box mt={5}>
          <BookingForm booths={booths} />
        </Box>
        
      </Container>
    </Box>
  );
}