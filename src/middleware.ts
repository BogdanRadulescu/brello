import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export const middleware = async (request: NextRequest) => {
    if (!request.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}
 
export const config = {
  matcher: '/:path*',
}