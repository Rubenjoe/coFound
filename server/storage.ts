import type { ValidationReport } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getReport(id: string): Promise<ValidationReport | undefined>;
  createReport(report: ValidationReport): Promise<ValidationReport>;
  getAllReports(): Promise<ValidationReport[]>;
}

export class MemStorage implements IStorage {
  private reports: Map<string, ValidationReport>;

  constructor() {
    this.reports = new Map();
  }

  async getReport(id: string): Promise<ValidationReport | undefined> {
    return this.reports.get(id);
  }

  async createReport(report: ValidationReport): Promise<ValidationReport> {
    this.reports.set(report.id, report);
    return report;
  }

  async getAllReports(): Promise<ValidationReport[]> {
    return Array.from(this.reports.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
}

export const storage = new MemStorage();
