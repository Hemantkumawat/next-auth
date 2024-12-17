import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from './middlewares/authMiddleware';
import { errorResponse } from './utils/errorResponse';

export async function middleware(req: NextRequest) {
  try {
    let res = await authMiddleware(req);
    return res;
  } catch (error) {
    console.error('error:::', error);
    return errorResponse(error);
  }
}

export const config = {
  matcher: [
    '/api/users/me',
    '/api/users/:path*', '/api/admin/:path*']
};