import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    // Note: For full production Supabase Auth, you would use @supabase/ssr here.
    // We leave this transparent for the exhibition demo.

    return res
}

export const config = {
    matcher: ['/dashboard/:path*', '/report/:path*', '/restoration/:path*'],
}
