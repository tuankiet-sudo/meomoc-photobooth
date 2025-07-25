"use client";

import { useState } from "react";
import Image from "next/image";
import { Box, Typography, Card, CardMedia, Tabs, Tab } from "@mui/material";

interface Booth {
  id: string;
  name: string;
  images: string[];
}

// Helper function to get the color based on the booth name
const getTabColor = (boothName: string) => {
  switch (boothName) {
    case "OverBeann":
      return "#380c0f";
    case "Forest Winkk":
      return "#00b14f";
    default:
      return "#880000";
  }
};

export function InteractiveShowcase({ booths }: { booths: Booth[] }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const selectedTabColor = getTabColor(booths[selectedTab]?.name);

  return (
    <Box sx={{ width: '100%' }}>
      {/* --- Booth Name Tabs --- */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={selectedTab} 
          onChange={handleChange} 
          variant="scrollable"
          scrollButtons="auto"
          aria-label="booth selector tabs"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: selectedTabColor,
            },
          }}
        >
          {booths.map((booth) => (
            <Tab 
              key={booth.id} 
              label={booth.name} 
              sx={{ 
                fontWeight: 'bold',
                // --- UPDATED LOGIC ---
                color: 'text.secondary', // Default color for unselected tabs
                '&.Mui-selected': {
                  color: getTabColor(booth.name), // Apply special color only when selected
                },
              }} 
            />
          ))}
        </Tabs>
      </Box>

      {/* --- Image Gallery for Selected Booth --- */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          py: 1,
          scrollSnapType: 'x mandatory',
          '&::-webkit-scrollbar': { height: '6px' },
          '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '3px' },
        }}
      >
        {booths[selectedTab].images.map((src, index) => (
          <Box
            key={index}
            sx={{
              flex: '0 0 auto',
              width: { xs: '50%', sm: '35%', md: '30%' },
              scrollSnapAlign: 'start',
            }}
          >
            <Card
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              }}
            >
              <CardMedia sx={{ position: 'relative', pt: '177.78%' /* 9:16 Ratio */ }}>
                <Image
                  src={src}
                  alt={`${booths[selectedTab].name} example ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </CardMedia>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
}