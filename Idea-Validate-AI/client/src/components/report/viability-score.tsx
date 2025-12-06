import { Gauge } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ViabilityScoreProps {
  score: number;
  summary: string;
}

function getScoreColor(score: number): string {
  if (score >= 8) return "text-chart-2";
  if (score >= 6) return "text-chart-4";
  if (score >= 4) return "text-chart-5";
  return "text-destructive";
}

function getScoreLabel(score: number): string {
  if (score >= 8) return "Highly Viable";
  if (score >= 6) return "Promising";
  if (score >= 4) return "Needs Work";
  return "High Risk";
}

function getScoreBackground(score: number): string {
  if (score >= 8) return "bg-chart-2/10";
  if (score >= 6) return "bg-chart-4/10";
  if (score >= 4) return "bg-chart-5/10";
  return "bg-destructive/10";
}

export function ViabilityScore({ score, summary }: ViabilityScoreProps) {
  const colorClass = getScoreColor(score);
  const bgClass = getScoreBackground(score);

  return (
    <Card className="border-card-border">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className={`w-24 h-24 rounded-full ${bgClass} flex items-center justify-center flex-shrink-0 mx-auto md:mx-0`}>
            <div className="text-center">
              <span className={`text-4xl font-bold ${colorClass}`}>{score}</span>
              <span className="text-lg text-muted-foreground">/10</span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Gauge className={`w-5 h-5 ${colorClass}`} />
              <span className={`font-semibold ${colorClass}`}>{getScoreLabel(score)}</span>
            </div>
            <p className="text-muted-foreground">{summary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
