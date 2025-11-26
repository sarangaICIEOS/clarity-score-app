// middleware
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware runs for every request to the application
export function proxy(request: NextRequest) {
  // Example: Log the request URL
  console.log('Request URL:', request.url);

  // You can add custom logic here, such as authentication checks or redirects

  // Continue to the next middleware or route handler
  return NextResponse.next();
}