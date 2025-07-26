"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

// This component handles Supabase realtime subscriptions
export function RealtimeProvider() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel('queue-changes')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', // Listen only for new bookings
          schema: 'public', 
          table: 'queue_entries' 
        },
        (payload) => {
          // When a new booking is inserted, refresh the page's data
          console.log('New booking detected, refreshing data...');
          router.refresh();
        }
      )
      .subscribe();

    // Cleanup function to remove the channel subscription when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [router]);

  return null; // This component does not render anything
}