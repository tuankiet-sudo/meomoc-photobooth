import { createClient } from "@/utils/supabase/server";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user || !user.user_metadata?.is_staff) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { booth_id } = await request.json();

  if (!booth_id) {
    return NextResponse.json({ error: "Booth ID is required" }, { status: 400 });
  }

  try {
    const { data: boothData, error: boothError } = await supabaseAdmin
      .from('booths')
      .select('current_customer_ordinal')
      .eq('id', booth_id)
      .single();

    if (boothError || !boothData) {
      return NextResponse.json({ error: "Booth not found" }, { status: 404 });
    }
    
    const oldOrdinal = boothData.current_customer_ordinal ?? 0;
    const nextOrdinal = oldOrdinal + 1;

    // --- Start Transaction ---
    // A transaction ensures that all database operations succeed or fail together.
    const { error: transactionError } = await supabaseAdmin.rpc('handle_next_customer', {
      p_booth_id: booth_id,
      p_old_ordinal: oldOrdinal,
      p_next_ordinal: nextOrdinal
    });

    if (transactionError) {
        throw transactionError;
    }

    return NextResponse.json({ success: true, new_ordinal: nextOrdinal });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}