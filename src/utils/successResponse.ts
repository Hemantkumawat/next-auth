import { NextResponse } from 'next/server';
import { statusCodes } from './errorResponse';

type SuccessResponseParams = {
  message: string;
  data: any;
  status?: number;
};

export function successResponse({ message, data, status = statusCodes.OK }: SuccessResponseParams) {
  return NextResponse.json({ message, data }, { status });
}