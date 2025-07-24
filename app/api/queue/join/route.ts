import { supabaseAdmin } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { booth_id, customer_name, contact_info } = body;

  if (!booth_id || !customer_name || !contact_info?.phone) {
    return NextResponse.json({ error: 'Booth, name, and phone number are required' }, { status: 400 });
  }

  try {
    // Call the updated SQL function with separate parameters
    const { data, error } = await supabaseAdmin.rpc('upsert_customer_and_join_queue', {
      p_phone: contact_info.phone,
      p_name: customer_name,
      p_email: contact_info.email || null,
      p_birthday: contact_info.birthday || null,
      p_booth_id: booth_id
    }).single();

    if (error) {
      console.error("RPC Error:", error);
      throw new Error("Failed to process booking.");
    }

    return NextResponse.json(data);

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}