import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('token')?.value
 
  
  if (!currentUser && !request.nextUrl.pathname.startsWith('/auth')) {
    return Response.redirect(new URL('/auth/login', request.url))
  }
}
 
export const config = {
  matcher: ['/((?!api|assets|_next/static|_next/image|.*\\.png$|.*__ENV.js).*)'],
}