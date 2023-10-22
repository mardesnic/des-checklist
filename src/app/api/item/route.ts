import { NextRequest, NextResponse } from 'next/server';
import ItemService from './service';

export async function GET() {
  const items = await ItemService.find();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const title = body?.title || '';
  const newItem = await ItemService.create({ title });
  return NextResponse.json(newItem);
}

export async function DELETE() {
  await ItemService.delete();
  return NextResponse.json({ message: 'Successfully deleted all items.' });
}
