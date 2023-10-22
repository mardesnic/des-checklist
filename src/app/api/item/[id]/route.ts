import { NextRequest, NextResponse } from 'next/server';
import ItemService from '../service';

export async function PATCH(
  req: NextRequest,
  contex: { params: { id: string } }
) {
  const id = contex.params.id;
  const body = await req.json();
  const complete = body?.complete;
  const data = {
    complete,
  };
  const item = await ItemService.update(id, data);
  return NextResponse.json(item);
}
