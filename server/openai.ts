import OpenAI from "openai";
import type { ValidationReport } from "@shared/schema";
import { randomUUID } from "crypto";

// the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user

let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OpenAI API key is not configured. Please add your OPENAI_API_KEY.");
    }
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

const VALIDATION_PROMPT = `You are an expert startup analyst and business strategist. Analyze the following startup idea and generate a comprehensive business validation report.

The report must be a valid JSON object with this exact structure:
{
  "ideaSummary": "A 2-3 sentence summary of the idea and its potential",
  "viabilityScore": <number 1-10>,
  "targetCustomers": [
    {
      "name": "Segment name",
      "demographics": ["demographic trait 1", "demographic trait 2", "demographic trait 3"],
      "painPoints": ["pain point 1", "pain point 2", "pain point 3"]
    }
  ],
  "marketOverview": {
    "tam": "Total addressable market size (e.g., '$50B')",
    "growthRate": "Annual growth rate (e.g., '15% CAGR')",
    "keyTrend": "Most important market trend",
    "opportunities": ["opportunity 1", "opportunity 2", "opportunity 3", "opportunity 4"]
  },
  "competitors": [
    {
      "name": "Competitor name",
      "positioning": "How they position themselves",
      "strengths": ["strength 1", "strength 2", "strength 3"]
    }
  ],
  "leanCanvas": {
    "problem": ["problem 1", "problem 2", "problem 3"],
    "solution": ["solution 1", "solution 2", "solution 3"],
    "uniqueValueProp": "Clear, compelling message",
    "unfairAdvantage": "What can't be easily copied",
    "customerSegments": ["segment 1", "segment 2"],
    "channels": ["channel 1", "channel 2", "channel 3"],
    "revenueStreams": ["revenue stream 1", "revenue stream 2"],
    "costStructure": ["cost 1", "cost 2", "cost 3"],
    "keyMetrics": ["metric 1", "metric 2", "metric 3"]
  },
  "mvpRoadmap": [
    {
      "week": 1,
      "title": "Week title",
      "tasks": ["task 1", "task 2", "task 3"],
      "deliverables": ["deliverable 1", "deliverable 2"],
      "successMetrics": ["metric 1", "metric 2"]
    }
  ]
}

Guidelines:
- Generate 2-3 target customer segments
- Include 3-5 realistic competitors (can be direct or indirect)
- Create a 2-4 week MVP roadmap with actionable, specific tasks
- Be realistic but constructive in your assessment
- The viability score should reflect market potential, competition level, and execution difficulty
- All text should be concise and actionable

Startup Idea to analyze:
`;

export async function analyzeStartupIdea(idea: string): Promise<ValidationReport> {
  const client = getOpenAIClient();
  
  const response = await client.chat.completions.create({
    model: "gpt-5",
    messages: [
      {
        role: "system",
        content: "You are a startup validation expert. Always respond with valid JSON matching the requested structure exactly."
      },
      {
        role: "user",
        content: VALIDATION_PROMPT + idea
      }
    ],
    response_format: { type: "json_object" },
    max_completion_tokens: 4096
  });

  const content = response.choices[0].message.content;
  if (!content) {
    throw new Error("No response from AI");
  }

  const analysisResult = JSON.parse(content);

  const report: ValidationReport = {
    id: randomUUID(),
    idea,
    ideaSummary: analysisResult.ideaSummary,
    viabilityScore: Math.min(10, Math.max(1, analysisResult.viabilityScore)),
    targetCustomers: analysisResult.targetCustomers,
    marketOverview: analysisResult.marketOverview,
    competitors: analysisResult.competitors,
    leanCanvas: analysisResult.leanCanvas,
    mvpRoadmap: analysisResult.mvpRoadmap,
    createdAt: new Date().toISOString()
  };

  return report;
}
