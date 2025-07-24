"use client";

import Image from "next/image";
import { Card, CardContent, CardMedia, Typography, Box, IconButton } from "@mui/material";
import { useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export function Booth({ booth }: { booth: any }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % booth.images.length);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + booth.images.length) % booth.images.length
    );
  };

  return (
    <Card sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      borderRadius: 3,
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
      },
    }}>
      <Box sx={{ position: "relative", "&:hover .nav-arrows": { opacity: 1 } }}>
        <CardMedia component="div" sx={{ position: "relative", pt: "177.78%" }}>
          <Image
            src={booth.images[currentImageIndex]}
            alt={`${booth.name} image ${currentImageIndex + 1}`}
            layout="fill"
            objectFit="cover"
          />
        </CardMedia>
        <Box
          className="nav-arrows"
          sx={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            opacity: 0, transition: "opacity 0.3s ease", px: 1,
          }}
        >
          <IconButton size="small" onClick={handlePrevImage} sx={{ bgcolor: "rgba(0, 0, 0, 0.4)", color: "white", "&:hover": { bgcolor: "rgba(0, 0, 0, 0.6)" } }}>
            <ArrowBackIosNewIcon fontSize="inherit" />
          </IconButton>
          <IconButton size="small" onClick={handleNextImage} sx={{ bgcolor: "rgba(0, 0, 0, 0.4)", color: "white", "&:hover": { bgcolor: "rgba(0, 0, 0, 0.6)" } }}>
            <ArrowForwardIosIcon fontSize="inherit" />
          </IconButton>
        </Box>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {booth.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Quẩy trong: {booth.estimated_session_duration_minutes} phút
        </Typography>
      </CardContent>
    </Card>
  );
}