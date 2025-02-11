// services/syncService.ts
import { PrismaClient } from '@prisma/client';
import { cache } from './cacheService';

const prisma = new PrismaClient();

export class SyncService {
  private static readonly SYNC_INTERVAL = 5000; // 5 seconds
  private static syncQueue: Map<string, any> = new Map();

  static async syncData(userId: string, data: any) {
    try {
      // Add to sync queue
      this.syncQueue.set(userId, {
        ...this.syncQueue.get(userId),
        ...data,
        timestamp: Date.now()
      });

      // Update cache immediately
      await cache.set(`user:${userId}:data`, data);

      // Delayed sync to database
      setTimeout(async () => {
        const queuedData = this.syncQueue.get(userId);
        if (queuedData && queuedData.timestamp === Date.now()) {
          await this.syncToDatabase(userId, queuedData);
          this.syncQueue.delete(userId);
        }
      }, this.SYNC_INTERVAL);
    } catch (error) {
      console.error('Sync error:', error);
      throw new Error('فشل في مزامنة البيانات');
    }
  }

  private static async syncToDatabase(userId: string, data: any) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        transcriptions: {
          create: data.transcriptions?.map((t: any) => ({
            text: t.text,
            corrected: t.corrected,
            createdAt: t.createdAt
          }))
        }
      }
    });
  }
}
