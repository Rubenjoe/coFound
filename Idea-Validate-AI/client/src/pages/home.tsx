import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { IdeaInputForm } from "@/components/idea-input-form";
import { LoadingAnalysis } from "@/components/loading-analysis";
import { ReportDashboard } from "@/components/report/report-dashboard";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { ValidationReport } from "@shared/schema";

type ViewState = "input" | "loading" | "report";

export default function Home() {
  const [viewState, setViewState] = useState<ViewState>("input");
  const [report, setReport] = useState<ValidationReport | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const validateMutation = useMutation({
    mutationFn: async (idea: string) => {
      const response = await apiRequest("POST", "/api/validate", { idea });
      return await response.json() as ValidationReport;
    },
    onMutate: () => {
      setViewState("loading");
    },
    onSuccess: (data) => {
      setReport(data);
      setViewState("report");
    },
    onError: (error: Error) => {
      setViewState("input");
      toast({
        title: "Analysis Failed",
        description: error.message || "Failed to analyze your idea. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (idea: string) => {
    validateMutation.mutate(idea);
  };

  const handleNewValidation = () => {
    setReport(null);
    setViewState("input");
  };

  const handleExportPdf = async () => {
    if (!report) return;
    
    setIsExporting(true);
    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF();
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - 2 * margin;
      let yPos = 20;

      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Validation Report", margin, yPos);
      yPos += 15;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100);
      doc.text(`Generated on ${new Date(report.createdAt).toLocaleDateString()}`, margin, yPos);
      yPos += 10;

      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0);
      doc.text(`Viability Score: ${report.viabilityScore}/10`, margin, yPos);
      yPos += 10;

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const summaryLines = doc.splitTextToSize(report.ideaSummary, contentWidth);
      doc.text(summaryLines, margin, yPos);
      yPos += summaryLines.length * 5 + 10;

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Your Idea:", margin, yPos);
      yPos += 7;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const ideaLines = doc.splitTextToSize(report.idea, contentWidth);
      doc.text(ideaLines, margin, yPos);
      yPos += ideaLines.length * 5 + 15;

      const addSection = (title: string, content: string[]) => {
        if (yPos > 260) {
          doc.addPage();
          yPos = 20;
        }
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text(title, margin, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        content.forEach((item) => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          const lines = doc.splitTextToSize(`• ${item}`, contentWidth);
          doc.text(lines, margin, yPos);
          yPos += lines.length * 5 + 2;
        });
        yPos += 10;
      };

      addSection("Target Customers", report.targetCustomers.map(c => 
        `${c.name}: ${c.painPoints.join(", ")}`
      ));

      addSection("Market Overview", [
        `TAM: ${report.marketOverview.tam}`,
        `Growth Rate: ${report.marketOverview.growthRate}`,
        `Key Trend: ${report.marketOverview.keyTrend}`,
        ...report.marketOverview.opportunities.map(o => `Opportunity: ${o}`)
      ]);

      addSection("Competitors", report.competitors.map(c =>
        `${c.name} - ${c.positioning}. Strengths: ${c.strengths.join(", ")}`
      ));

      addSection("Lean Canvas", [
        `Problem: ${report.leanCanvas.problem.join("; ")}`,
        `Solution: ${report.leanCanvas.solution.join("; ")}`,
        `Unique Value: ${report.leanCanvas.uniqueValueProp}`,
        `Channels: ${report.leanCanvas.channels.join(", ")}`,
        `Revenue: ${report.leanCanvas.revenueStreams.join(", ")}`,
        `Costs: ${report.leanCanvas.costStructure.join(", ")}`
      ]);

      addSection("MVP Roadmap", report.mvpRoadmap.map(w =>
        `Week ${w.week}: ${w.title} - ${w.tasks.join("; ")}`
      ));

      doc.save(`validation-report-${report.id}.pdf`);
      
      toast({
        title: "PDF Exported",
        description: "Your validation report has been downloaded.",
      });
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {viewState === "input" && (
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-2xl space-y-8">
              <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">AI Cofound</h1>
                <p className="text-lg text-muted-foreground max-w-md mx-auto">
                  Validate your startup idea in 60 seconds with AI-powered insights
                </p>
              </div>
              <IdeaInputForm 
                onSubmit={handleSubmit} 
                isLoading={validateMutation.isPending} 
              />
            </div>
          </div>
          <footer className="p-6 text-center text-sm text-muted-foreground">
            Built with AI to help founders move faster
          </footer>
        </div>
      )}

      {viewState === "loading" && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <LoadingAnalysis />
        </div>
      )}

      {viewState === "report" && report && (
        <ReportDashboard 
          report={report}
          onNewValidation={handleNewValidation}
          onExportPdf={handleExportPdf}
          isExporting={isExporting}
        />
      )}
    </main>
  );
}
