import { NextRequest, NextResponse } from 'next/server';
import { includes } from "lodash";
import { authMiddleware } from './middlewares/authMiddleware';

export async function middleware(req: NextRequest) {
  const role = req.headers.get("authorization");
  await authMiddleware(req);
  return NextResponse.next();
}

export const config = {
    matcher: [
      '/api/users/me',
      '/api/users/:path*', '/api/admin/:path*']
};