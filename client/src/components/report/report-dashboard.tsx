import { useState, useEffect, useRef } from "react";
import { Download, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViabilityScore } from "./viability-score";
import { TargetCustomers } from "./target-customers";
import { MarketOverview } from "./market-overview";
import { Competitors } from "./competitors";
import { LeanCanvas } from "./lean-canvas";
import { MvpRoadmap } from "./mvp-roadmap";
import { ReportNav } from "./report-nav";
import type { ValidationReport } from "@shared/schema";

interface ReportDashboardProps {
  report: ValidationReport;
  onNewValidation: () => void;
  onExportPdf: () => void;
  isExporting: boolean;
}

export function ReportDashboard({ 
  report, 
  onNewValidation, 
  onExportPdf,
  isExporting
}: ReportDashboardProps) {
  const [activeSection, setActiveSection] = useState<string>("target-customers");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;

      const sections = [
        "target-customers",
        "market-overview",
        "competitors",
        "lean-canvas",
        "mvp-roadmap",
      ];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    const content = contentRef.current;
    if (content) {
      content.addEventListener("scroll", handleScroll);
      return () => content.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <div className="flex h-full">
      <aside className="hidden lg:block w-64 border-r border-border p-6 flex-shrink-0">
        <div className="sticky top-6 space-y-6">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Viability Score
            </p>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="text-2xl font-bold">{report.viabilityScore}/10</span>
            </div>
          </div>
          
          <ReportNav activeSection={activeSection} />

          <div className="pt-4 border-t border-border space-y-2">
            <Button 
              variant="outline" 
              className="w-full gap-2" 
              onClick={onExportPdf}
              disabled={isExporting}
              data-testid="button-export-pdf"
            >
              <Download className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Export PDF"}
            </Button>
            <Button 
              variant="ghost" 
              className="w-full gap-2" 
              onClick={onNewValidation}
              data-testid="button-new-validation"
            >
              <ArrowLeft className="w-4 h-4" />
              New Validation
            </Button>
          </div>
        </div>
      </aside>

      <div 
        ref={contentRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-4xl mx-auto p-6 lg:p-8 space-y-12">
          <header className="space-y-4">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold">Validation Report</h1>
                <p className="text-muted-foreground">
                  Generated on {new Date(report.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="lg:hidden flex gap-2">
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={onExportPdf}
                  disabled={isExporting}
                  data-testid="button-export-pdf-mobile"
                >
                  <Download className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={onNewValidation}
                  data-testid="button-new-validation-mobile"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm font-medium text-muted-foreground mb-1">Your Idea</p>
              <p className="text-sm">{report.idea}</p>
            </div>

            <ViabilityScore 
              score={report.viabilityScore} 
              summary={report.ideaSummary} 
            />
          </header>

          <div className="space-y-12" id="report-content">
            <TargetCustomers customers={report.targetCustomers} />
            <MarketOverview market={report.marketOverview} />
            <Competitors competitors={report.competitors} />
            <LeanCanvas canvas={report.leanCanvas} />
            <MvpRoadmap roadmap={report.mvpRoadmap} />
          </div>

          <footer className="pt-8 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              This report was generated by AI Cofound. Use these insights as a starting point for your validation journey.
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <Button onClick={onNewValidation} data-testid="button-validate-another">
                Validate Another Idea
              </Button>
              <Button 
                variant="outline" 
                onClick={onExportPdf}
                disabled={isExporting}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                {isExporting ? "Exporting..." : "Export PDF"}
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
