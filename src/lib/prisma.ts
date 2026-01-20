
import "server-only";





import { PrismaClient } from "@prisma/client";

let _prisma: PrismaClient | undefined;
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function getPrismaInstance(): PrismaClient | undefined {
	if (_prisma) return _prisma;
	if (globalForPrisma.prisma) {
		_prisma = globalForPrisma.prisma;
		return _prisma;
	}
	if (!process.env.DATABASE_URL) return undefined;
	_prisma = new PrismaClient();
	if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = _prisma;
	return _prisma;
}

// Export a proxy that lazily resolves to a real PrismaClient when DATABASE_URL is available.
// This avoids constructing PrismaClient during build-time when DB config may be absent.
export const prisma = new Proxy(
	{},
	{
		get(_target, prop) {
			const client = getPrismaInstance();
			if (!client) throw new Error('PrismaClient not initialized: missing DATABASE_URL');
			// @ts-ignore delegate to real client
			return (client as any)[prop];
		},
		apply(_target, _thisArg, _args) {
			const client = getPrismaInstance();
			if (!client) throw new Error('PrismaClient not initialized: missing DATABASE_URL');
			return (client as any).apply(_thisArg, _args);
		},
	}
) as unknown as PrismaClient;
