import { LayoutGrid } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LeanCanvas as LeanCanvasType } from "@shared/schema";

interface LeanCanvasProps {
  canvas: LeanCanvasType;
}

function CanvasBlock({ 
  title, 
  items, 
  className = "" 
}: { 
  title: string; 
  items: string[] | string; 
  className?: string;
}) {
  const itemList = Array.isArray(items) ? items : [items];
  
  return (
    <div className={`p-4 border border-border rounded-lg ${className}`}>
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
        {title}
      </h4>
      {itemList.length === 1 && !Array.isArray(items) ? (
        <p className="text-sm">{itemList[0]}</p>
      ) : (
        <ul className="space-y-2">
          {itemList.map((item, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <span className="w-1 h-1 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function LeanCanvas({ canvas }: LeanCanvasProps) {
  return (
    <section id="lean-canvas" className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center">
          <LayoutGrid className="w-5 h-5 text-chart-4" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Lean Canvas</h2>
          <p className="text-sm text-muted-foreground">
            One-page business model overview
          </p>
        </div>
      </div>

      <Card className="border-card-border">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-5">
            <div className="space-y-4 md:col-span-1">
              <CanvasBlock title="Problem" items={canvas.problem} />
              <CanvasBlock title="Existing Alternatives" items={canvas.customerSegments} />
            </div>

            <div className="space-y-4 md:col-span-1">
              <CanvasBlock title="Solution" items={canvas.solution} />
              <CanvasBlock title="Key Metrics" items={canvas.keyMetrics} />
            </div>

            <div className="md:col-span-1">
              <CanvasBlock 
                title="Unique Value Proposition" 
                items={canvas.uniqueValueProp} 
                className="h-full"
              />
            </div>

            <div className="space-y-4 md:col-span-1">
              <CanvasBlock title="Unfair Advantage" items={canvas.unfairAdvantage} />
              <CanvasBlock title="Channels" items={canvas.channels} />
            </div>

            <div className="space-y-4 md:col-span-1">
              <CanvasBlock title="Customer Segments" items={canvas.customerSegments} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <CanvasBlock title="Cost Structure" items={canvas.costStructure} />
            <CanvasBlock title="Revenue Streams" items={canvas.revenueStreams} />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
