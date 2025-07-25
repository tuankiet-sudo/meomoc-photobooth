import { supabaseAdmin } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: Promise<{ queue_entry_id: string }> }) {
  const {queue_entry_id} = await params;

  const { data: entry, error: entryError } = await supabaseAdmin
    .from('queue_entries')
    .select('id, booth_id, ordinal_number, status')
    .eq('id', queue_entry_id)
    .single();

  if (entryError || !entry)
    return NextResponse.json({ error: 'Queue entry not found' }, { status: 404 });

  const { data: booth } = await supabaseAdmin
    .from('booths')
    // --- Add `name` to the select query ---
    .select('name, current_customer_ordinal, estimated_session_duration_minutes')
    .eq('id', entry.booth_id)
    .single();

  const current_customer_ordinal = booth?.current_customer_ordinal ?? 0;
  const session_minutes = booth?.estimated_session_duration_minutes ?? 5;

  const people_ahead = entry.ordinal_number - current_customer_ordinal - 1;
  const estimated_wait_time = Math.max(0, people_ahead) * session_minutes;

  return NextResponse.json({
    // --- Add `booth_name` to the response ---
    booth_name: booth?.name,
    ordinal_number: entry.ordinal_number,
    status: entry.status,
    number_of_customers_before: Math.max(0, people_ahead),
    estimated_wait_time
  });
}