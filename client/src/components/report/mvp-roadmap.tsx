import { Calendar, CheckSquare, Target, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WeekMilestone } from "@shared/schema";

interface MvpRoadmapProps {
  roadmap: WeekMilestone[];
}

export function MvpRoadmap({ roadmap }: MvpRoadmapProps) {
  return (
    <section id="mvp-roadmap" className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-chart-5/10 flex items-center justify-center">
          <Calendar className="w-5 h-5 text-chart-5" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">MVP Roadmap</h2>
          <p className="text-sm text-muted-foreground">
            Week-by-week plan to build and launch your MVP
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-border hidden md:block" />
        
        <div className="space-y-6">
          {roadmap.map((week, index) => (
            <div key={index} className="relative">
              <div className="md:ml-12">
                <Card className="border-card-border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="absolute left-0 hidden md:flex w-10 h-10 rounded-full bg-primary text-primary-foreground items-center justify-center font-semibold text-sm">
                        W{week.week}
                      </div>
                      <Badge variant="outline" className="md:hidden">
                        Week {week.week}
                      </Badge>
                      <CardTitle className="text-lg">{week.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckSquare className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-muted-foreground">Tasks</span>
                      </div>
                      <ul className="space-y-2 pl-6">
                        {week.tasks.map((task, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            {task}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Rocket className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">Deliverables</span>
                        </div>
                        <ul className="space-y-2 pl-6">
                          {week.deliverables.map((deliverable, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                              {deliverable}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-muted-foreground">Success Metrics</span>
                        </div>
                        <ul className="space-y-2 pl-6">
                          {week.successMetrics.map((metric, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-chart-4 mt-2 flex-shrink-0" />
                              {metric}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
