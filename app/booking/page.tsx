import { BookingForm } from "./booking-form";
import { Container, Typography, Box } from "@mui/material";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { InteractiveShowcase } from "./InteractiveShowcase";

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
      <Container sx={{
        py: { xs: 3, md: 5 },
        px: { xs: 3, sm: 3 }  
      }}>

        {/* --- REFINED HERO SECTION --- */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ fontWeight: 'bold', color: 'primary.main' }}
          >
            Chọn Ngay Concept & Chốt Đơn!
          </Typography>
          <Typography variant="h5" color="secondary.main" sx={{ mt: 1 }}>
            Chọn booth bạn thích bên dưới để xem ảnh và lấy số chờ ngay.
          </Typography>
        </Box>
        
        {/* --- INTERACTIVE SHOWCASE --- */}
        <InteractiveShowcase booths={booths} />

        {/* --- BOOKING FORM --- */}
        <Box mt={{ xs: 4, md: 6 }}>
          <BookingForm booths={booths} />
        </Box>
        
      </Container>
    </Box>
  );
}