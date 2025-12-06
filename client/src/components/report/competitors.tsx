import { Building2, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Competitor } from "@shared/schema";

interface CompetitorsProps {
  competitors: Competitor[];
}

export function Competitors({ competitors }: CompetitorsProps) {
  return (
    <section id="competitors" className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
          <Building2 className="w-5 h-5 text-chart-3" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Competitor Analysis</h2>
          <p className="text-sm text-muted-foreground">
            Key players and their positioning in the market
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {competitors.map((competitor, index) => (
          <Card key={index} className="border-card-border">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <CardTitle className="text-lg">{competitor.name}</CardTitle>
                <p className="text-sm text-muted-foreground italic">
                  {competitor.positioning}
                </p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {competitor.strengths.map((strength, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 py-2 rounded-md bg-muted/50 text-sm"
                  >
                    <Star className="w-4 h-4 text-chart-4" />
                    {strength}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
