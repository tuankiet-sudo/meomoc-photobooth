import { supabaseAdmin } from "@/utils/supabase/admin";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data, error } = await supabaseAdmin.rpc('get_queue_data');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Group the flat data by booth
  const boothsMap = new Map();
  for (const row of data) {
    if (!boothsMap.has(row.booth_id)) {
      boothsMap.set(row.booth_id, {
        id: row.booth_id,
        name: row.booth_name,
        current_customer_ordinal: row.current_customer_ordinal,
        queue: [],
      });
    }
    if (row.queue_entry_id) {
      boothsMap.get(row.booth_id).queue.push({
        id: row.queue_entry_id,
        ordinal_number: row.queue_ordinal_number,
        customer_name: row.customer_name,
        customer_phone: row.customer_phone,
      });
    }
  }
  
  const groupedData = Array.from(boothsMap.values());
  return NextResponse.json(groupedData);
}