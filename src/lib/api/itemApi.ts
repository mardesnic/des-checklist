'use server';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { prisma } from '@/db';
import { Item } from '@prisma/client';
import { getServerSession } from 'next-auth';

const MAX_TITLE_LENGTH = 100;

async function getUserId(): Promise<string> {
  const session = await getServerSession(authOptions);
  return session?.user?.id || '';
}

export async function getItems() {
  const userId = await getUserId();
  return await prisma.item.findMany({ where: { userId } });
}

export async function createItem(data: Partial<Item>): Promise<Item> {
  const userId = await getUserId();
  const title = data?.title || '';
  const truncatedTitle = title.substring(0, MAX_TITLE_LENGTH);
  const newItem = { userId, title: truncatedTitle, complete: false };
  return await prisma.item.create({
    data: newItem,
  });
}

export async function updateItem(id: string, complete: boolean) {
  const userId = await getUserId();
  return await prisma.item.update({
    where: { userId, id },
    data: { complete },
  });
}

export async function removeCompletedItems() {
  const userId = await getUserId();
  return await prisma.item.deleteMany({ where: { userId, complete: true } });
}

export async function removeAllItems() {
  const userId = await getUserId();
  return await prisma.item.deleteMany({ where: { userId } });
}
