"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";

export function BookingForm({ booths }: { booths: any[] }) {
  const router = useRouter(); // Initialize router
  const [boothId, setBoothId] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    birthday: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!customerName) {
      setError("Name is required");
      setLoading(false);
      return;
    }
    if (!boothId) {
      setError("Please select a booth");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/queue/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booth_id: boothId,
          customer_name: customerName,
          contact_info: contactInfo,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to book");
      }

      const data = await response.json();
      // Redirect to the status page instead of showing a success message
      router.push(`/booking/status/${data.queue_entry_id}`);

    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
    // No setLoading(false) here because of the redirect
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 4,
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        bgcolor: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(8px)",
        maxWidth: "500px",
        mx: "auto",
      }}
    >
      <Typography variant="h2" component="h2" gutterBottom align="center">
        Make a Booking
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{xs:12}}>
          <FormControl fullWidth required>
            <InputLabel id="booth-select-label">Booth</InputLabel>
            <Select
              labelId="booth-select-label"
              value={boothId}
              label="Booth"
              onChange={(e) => setBoothId(e.target.value)}
            >
              <MenuItem value="">
                <em>Select a booth</em>
              </MenuItem>
              {booths.map((booth) => (
                <MenuItem key={booth.id} value={booth.id}>
                  {booth.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={{xs:12}}>
          <TextField
            fullWidth
            required
            label="Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Phone Number (Optional)"
            type="tel"
            value={contactInfo.phone}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, phone: e.target.value })
            }
          />
        </Grid>
        <Grid size={{xs:12, sm:6}}>
          <TextField
            fullWidth
            label="Email (Optional)"
            type="email"
            value={contactInfo.email}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, email: e.target.value })
            }
          />
        </Grid>
        <Grid size={{xs:12}}>
          <TextField
            fullWidth
            label="Birthday (Optional)"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={contactInfo.birthday}
            onChange={(e) =>
              setContactInfo({ ...contactInfo, birthday: e.target.value })
            }
          />
        </Grid>
        <Grid size={{xs:12}}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : "Book Now"}
          </Button>
        </Grid>
      </Grid>
      {error && (
        <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}