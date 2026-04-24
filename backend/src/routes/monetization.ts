import { Router } from "express";
import { z } from "zod";
import { prisma } from "../db.js";
import { requireAuth, requireRole } from "../auth.js";
import { HttpError } from "../http.js";

export const monetizationRouter = Router();

monetizationRouter.get("/plans", async (_req, res) => {
  const plans = await prisma.membershipPlan.findMany({ where: { isActive: true }, orderBy: { months: "asc" } });
  res.json({ plans });
});

monetizationRouter.post("/plans", requireRole("ADMIN"), async (req, res) => {
  const body = z
    .object({
      code: z.string().min(1),
      title: z.string().min(1),
      months: z.number().int().positive(),
      priceCents: z.number().int().positive(),
      benefits: z.record(z.string(), z.any()).default({}),
    })
    .parse(req.body);
  const plan = await prisma.membershipPlan.upsert({
    where: { code: body.code },
    create: { ...body, benefits: JSON.stringify(body.benefits) },
    update: { ...body, benefits: JSON.stringify(body.benefits) },
  });
  res.json({ plan });
});

monetizationRouter.post("/subscribe", requireAuth, async (req, res) => {
  const body = z.object({ planCode: z.string().min(1) }).parse(req.body);
  const plan = await prisma.membershipPlan.findUnique({ where: { code: body.planCode } });
  if (!plan) throw new HttpError(404, "Plan not found");
  const expiresAt = new Date(Date.now() + plan.months * 30 * 24 * 60 * 60 * 1000);
  const membership = await prisma.userMembership.create({
    data: { userId: req.auth!.sub, planId: plan.id, expiresAt, status: "ACTIVE" },
  });
  res.status(201).json({ membership });
});

monetizationRouter.get("/my-membership", requireAuth, async (req, res) => {
  const active = await prisma.userMembership.findFirst({
    where: { userId: req.auth!.sub, status: "ACTIVE", expiresAt: { gt: new Date() } },
    include: { plan: true },
    orderBy: { expiresAt: "desc" },
  });
  res.json({ membership: active });
});

