// prisma/prisma.config.ts for Prisma 7+ connection URLs

module.exports = {
  datasource: {
    db: {
      url: process.env.DATABASE_URL,
      directUrl: process.env.DIRECT_URL,
    },
  },
};
