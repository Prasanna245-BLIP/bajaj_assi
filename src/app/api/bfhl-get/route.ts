
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const operation_code = searchParams.get('operation_code');

  if (operation_code === '1') {
    return NextResponse.json({ operation_code: 1 });
  } else {
    return NextResponse.json({ operation_code: 0 }, { status: 400 });
  }
}
