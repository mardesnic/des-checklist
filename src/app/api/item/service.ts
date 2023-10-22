import { prisma } from '@/db';
import { Item } from '@prisma/client';
import { getCurrentUser } from '../auth/service';

export default class ItemService {
  static async find() {
    const { id: userId } = await getCurrentUser();
    return await prisma.item.findMany({
      where: { userId },
      orderBy: { complete: 'asc' },
    });
  }

  static async create(data: Partial<Item>): Promise<Item> {
    const { id: userId } = await getCurrentUser();
    const newItem = { userId, title: data?.title || '', complete: false };
    return await prisma.item.create({
      data: newItem,
    });
  }

  static async update(id: string, data: Partial<Item>) {
    const { id: userId } = await getCurrentUser();
    return await prisma.item.update({
      where: { userId, id },
      data,
    });
  }

  static async delete() {
    const { id: userId } = await getCurrentUser();
    return await prisma.item.deleteMany({ where: { userId } });
  }

  static async deleteCompleted() {
    const { id: userId } = await getCurrentUser();
    return await prisma.item.deleteMany({ where: { userId, complete: true } });
  }
}
