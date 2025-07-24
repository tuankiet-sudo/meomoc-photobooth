import { supabaseAdmin } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET(_: Request, { params }: { params: Promise<{ queue_entry_id: string }> }) {
  const id = await params;

  const { data: entry, error: entryError } = await supabaseAdmin
    .from('queue_entries')
    .select('id, booth_id, ordinal_number, arrival_status')
    .eq('id', id)
    .single();

  if (entryError || !entry)
    return NextResponse.json({ error: 'Queue entry not found' }, { status: 404 });

  const { data: booth } = await supabaseAdmin
    .from('booths')
    .select('current_customer_ordinal, estimated_session_duration_minutes')
    .eq('id', entry.booth_id)
    .single();

  const current_customer_ordinal = booth?.current_customer_ordinal ?? 0;
  const session_minutes = booth?.estimated_session_duration_minutes ?? 5;

  const people_ahead = entry.ordinal_number - current_customer_ordinal - 1;
  const estimated_wait_time = Math.max(0, people_ahead) * session_minutes;

  return NextResponse.json({
    ordinal_number: entry.ordinal_number,
    arrival_status: entry.arrival_status,
    number_of_customers_before: Math.max(0, people_ahead),
    estimated_wait_time
  });
}
