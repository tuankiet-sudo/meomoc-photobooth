import { supabaseAdmin } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { booth_id, customer_name, contact_info } = body;

  if (!booth_id) {
    return NextResponse.json({ error: 'Booth ID is required' }, { status: 400 });
  }

  // Step 1: Create new customer
  const { data: customer, error: customerError } = await supabaseAdmin
    .from('customers')
    .insert([{ name: customer_name || null, contact_info: contact_info || null }])
    .select()
    .single();

  if (customerError) return NextResponse.json({ error: customerError.message }, { status: 500 });

  // Step 2: Find next ordinal number
  const { data: maxOrdinalData, error: ordinalError } = await supabaseAdmin
    .from('queue_entries')
    .select('ordinal_number')
    .eq('booth_id', booth_id)
    .in('status', ['waiting', 'in_progress'])
    .order('ordinal_number', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (ordinalError) return NextResponse.json({ error: ordinalError.message }, { status: 500 });

  const nextOrdinal = (maxOrdinalData?.ordinal_number || 0) + 1;

  // Step 3: Create queue entry
  const { data: entry, error: entryError } = await supabaseAdmin
    .from('queue_entries')
    .insert([
      {
        booth_id,
        customer_id: customer.id,
        ordinal_number: nextOrdinal,
        status: 'waiting',
        arrival_status: 'pending'
      }
    ])
    .select()
    .single();

  if (entryError) return NextResponse.json({ error: entryError.message }, { status: 500 });

  // Step 4: Estimate wait time
  const { data: booth } = await supabaseAdmin
    .from('booths')
    .select('estimated_session_duration_minutes, current_customer_ordinal')
    .eq('id', booth_id)
    .single();

  const number_ahead = nextOrdinal - (booth?.current_customer_ordinal ?? 0) - 1;
  const estimated_wait_time = number_ahead * (booth?.estimated_session_duration_minutes ?? 5);

  return NextResponse.json({
    queue_entry_id: entry.id,
    ordinal_number: nextOrdinal,
    estimated_wait_time
  });
}
