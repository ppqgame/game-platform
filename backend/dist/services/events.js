import { prisma } from "../db.js";
export async function trackEvent(input) {
    await prisma.eventLog.create({
        data: {
            userId: input.userId ?? null,
            gameId: input.gameId ?? null,
            eventName: input.eventName,
            payload: JSON.stringify(input.payload ?? {}),
        },
    });
}
export async function flushUnprocessedEvents(limit = 500) {
    const events = await prisma.eventLog.findMany({
        where: { processed: false },
        orderBy: { createdAt: "asc" },
        take: limit,
    });
    if (!events.length)
        return { processed: 0 };
    await prisma.eventLog.updateMany({
        where: { id: { in: events.map((e) => e.id) } },
        data: { processed: true },
    });
    return { processed: events.length };
}
//# sourceMappingURL=events.js.map