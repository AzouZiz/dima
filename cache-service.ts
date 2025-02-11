// services/cacheService.ts
import { Redis } from 'ioredis';

class CacheService {
  private redis: Redis;
  private readonly TTL = 3600; // 1 hour

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  async get(key: string): Promise<any> {
    try {
      const data = await this.redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any): Promise<void> {
    try {
      await this.redis.setex(key, this.TTL, JSON.stringify(value));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async invalidate(key: string): Promise<void> {
    try {
      await this.redis.del(key);
    } catch (error) {
      console.error('Cache invalidation error:', error);
    }
  }
}

export const cache = new CacheService();
