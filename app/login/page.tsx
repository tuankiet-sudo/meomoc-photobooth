"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Đăng nhập thất bại! Vui lòng kiểm tra lại email và mật khẩu.");
      setLoading(false);
    } else {
      // On successful login, redirect to the admin page
      router.push("/admin");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: { xs: 8, md: 12 } }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Đăng Nhập Admin
          </Typography>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Mật Khẩu"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            fullWidth
            sx={{ py: 1.5, mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Đăng Nhập"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}