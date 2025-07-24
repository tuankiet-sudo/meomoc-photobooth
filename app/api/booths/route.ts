import { supabaseAdmin } from '@/utils/supabase/admin';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('booths')
    .select('id, name, estimated_session_duration_minutes')
    .eq('is_active', true)
    .order('name');

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
