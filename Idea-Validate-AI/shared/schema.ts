import { z } from "zod";

export const customerSegmentSchema = z.object({
  name: z.string(),
  demographics: z.array(z.string()),
  painPoints: z.array(z.string()),
});

export const marketOverviewSchema = z.object({
  tam: z.string(),
  growthRate: z.string(),
  keyTrend: z.string(),
  opportunities: z.array(z.string()),
});

export const competitorSchema = z.object({
  name: z.string(),
  positioning: z.string(),
  strengths: z.array(z.string()),
});

export const leanCanvasSchema = z.object({
  problem: z.array(z.string()),
  solution: z.array(z.string()),
  uniqueValueProp: z.string(),
  unfairAdvantage: z.string(),
  customerSegments: z.array(z.string()),
  channels: z.array(z.string()),
  revenueStreams: z.array(z.string()),
  costStructure: z.array(z.string()),
  keyMetrics: z.array(z.string()),
});

export const weekMilestoneSchema = z.object({
  week: z.number(),
  title: z.string(),
  tasks: z.array(z.string()),
  deliverables: z.array(z.string()),
  successMetrics: z.array(z.string()),
});

export const validationReportSchema = z.object({
  id: z.string(),
  idea: z.string(),
  ideaSummary: z.string(),
  viabilityScore: z.number().min(1).max(10),
  targetCustomers: z.array(customerSegmentSchema),
  marketOverview: marketOverviewSchema,
  competitors: z.array(competitorSchema),
  leanCanvas: leanCanvasSchema,
  mvpRoadmap: z.array(weekMilestoneSchema),
  createdAt: z.string(),
});

export type CustomerSegment = z.infer<typeof customerSegmentSchema>;
export type MarketOverview = z.infer<typeof marketOverviewSchema>;
export type Competitor = z.infer<typeof competitorSchema>;
export type LeanCanvas = z.infer<typeof leanCanvasSchema>;
export type WeekMilestone = z.infer<typeof weekMilestoneSchema>;
export type ValidationReport = z.infer<typeof validationReportSchema>;

export const insertValidationSchema = z.object({
  idea: z.string().min(10, "Please describe your idea in more detail (at least 10 characters)"),
});

export type InsertValidation = z.infer<typeof insertValidationSchema>;

export const users = {} as any;
export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = { id: string; username: string; password: string };
