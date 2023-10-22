import { NextResponse } from 'next/server';
import ItemService from '../service';

export async function DELETE() {
  await ItemService.deleteCompleted();
  return NextResponse.json({
    message: 'Successfully deleted completed items.',
  });
}
