import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/app/lib/auth';
import { ApiError, statusCodes } from '@/utils/errorResponse';

export const authMiddleware = async (req: NextRequest) => {
    const token = req.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        throw new ApiError('Not authenticated', statusCodes.UNAUTHORIZED);
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check-token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ token }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response from server:', errorText);
        throw new ApiError('Authentication failed', statusCodes.UNAUTHORIZED);
    }

    const data = await response.json();
    if (data.data === 'blacklisted') {
        throw new ApiError('Token blacklisted', statusCodes.UNAUTHORIZED);
    }

    const payload = await verifyToken(token);
    const requestHeaders = new Headers(req.headers)

    requestHeaders.set('x-user-id', String(payload.id));
    //requestHeaders.delete('x-from-client')

    // Attach the user payload to the request object for further use
    (req as any).user = payload;
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        }
    });
};
