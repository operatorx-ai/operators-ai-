// prisma/prisma.config.ts for Prisma 7+ connection URLs
import { defineConfig } from '@prisma/client';

export default defineConfig({
  datasource: {
    db: {
      url: process.env.DATABASE_URL,
      directUrl: process.env.DIRECT_URL,
    },
  },
});
