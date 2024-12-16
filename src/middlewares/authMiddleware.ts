import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/auth';
import { ApiError, statusCodes } from '@/utils/errorResponse';
import { withContext } from './context'

export const authMiddleware = async (req: NextRequest) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      throw new ApiError('Not authenticated', statusCodes.UNAUTHORIZED);
    }

    const payload = await verifyToken(token);
console.log('payload:::', payload);
    // Attach the user payload to the request object for further use
    (req as any).user = payload;

};

// Pre-define the possible context keys to prevent spoofing
const allowedContextKeys = ['foo']

export default withContext(allowedContextKeys, (setContext, req) => {
  setContext('foo', 'bar')
  return NextResponse.next()
})