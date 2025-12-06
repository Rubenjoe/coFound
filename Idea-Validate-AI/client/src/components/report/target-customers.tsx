import { Users, UserCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { CustomerSegment } from "@shared/schema";

interface TargetCustomersProps {
  customers: CustomerSegment[];
}

export function TargetCustomers({ customers }: TargetCustomersProps) {
  return (
    <section id="target-customers" className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-chart-1" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Target Customers</h2>
          <p className="text-sm text-muted-foreground">
            Key customer segments for your product
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((segment, index) => (
          <Card key={index} className="border-card-border">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-muted-foreground" />
                </div>
                <CardTitle className="text-lg">{segment.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Demographics
                </p>
                <div className="flex flex-wrap gap-2">
                  {segment.demographics.map((demo, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {demo}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">
                  Pain Points
                </p>
                <ul className="space-y-2">
                  {segment.painPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
