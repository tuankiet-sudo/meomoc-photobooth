"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Grid } from "@mui/material";
import { BoothQueue } from "./BoothQueue";

// Define the shape of the booth data
interface BoothData {
  id: string;
  name: string;
  current_customer_ordinal: number | null;
  queue: {
    id: string;
    ordinal_number: number;
    customer_name: string | null;
    customer_phone: string | null;
  }[];
}

export function AdminDashboard({ initialBooths }: { initialBooths: BoothData[] }) {
  const [booths, setBooths] = useState(initialBooths);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel('admin-queue-changes')
      .on(
        'postgres_changes',
        { 
          event: '*', // Listen for INSERT, UPDATE, DELETE
          schema: 'public', 
          table: 'queue_entries' 
        },
        async (payload) => {
          console.log('Change received!', payload);
          // When a change occurs, the simplest way to get the new
          // sorted list is to re-fetch the data via an API route
          // This is more reliable than trying to manually reconstruct the queue.
          const response = await fetch('/api/admin/get-queue-data');
          const updatedBooths = await response.json();
          setBooths(updatedBooths);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <Grid container spacing={4}>
      {booths.map((booth) => (
        <Grid size={{ xs:12, md:6, lg:4}} key={booth.id}>
            <BoothQueue booth={booth} />
        </Grid>
      ))}
    </Grid>
  );
}