// utils/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ⚠️ Do NOT insert any code here

    const {
    data: { user },
    } = await supabase.auth.getUser();

    const isAdminPath = request.nextUrl.pathname.startsWith('/admin');

    // 🚫 Not logged in
    if (!user) {
    if (isAdminPath) {
        // Must log in to access admin
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        return NextResponse.redirect(url);
    } else {
        // Public page — let them access
        return supabaseResponse;
    }
    }

    // 🚫 Logged in but not a staff member
    if (isAdminPath && !user.user_metadata?.is_staff) {
    const url = request.nextUrl.clone();
    url.pathname = '/'; // ⬅️ redirect to home
    return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
