import { NextResponse } from 'next/server';
import { userData } from '../../data';

export function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('pageNo') || '1', 10);
  const perPage = parseInt(searchParams.get('pageSize') || '10', 10);

  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginated = userData.slice(start, end);

  return NextResponse.json({
    data: paginated,
    total: userData.length,
    pageNo: page,
    pageSize: perPage,
  });