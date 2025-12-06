import { Globe, TrendingUp, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { MarketOverview as MarketOverviewType } from "@shared/schema";

interface MarketOverviewProps {
  market: MarketOverviewType;
}

export function MarketOverview({ market }: MarketOverviewProps) {
  return (
    <section id="market-overview" className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center">
          <Globe className="w-5 h-5 text-chart-2" />
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Market Overview</h2>
          <p className="text-sm text-muted-foreground">
            Size, growth, and opportunities in your target market
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-card-border">
          <CardContent className="pt-6 text-center">
            <p className="text-3xl font-bold text-chart-1">{market.tam}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Total Addressable Market
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardContent className="pt-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <TrendingUp className="w-6 h-6 text-chart-2" />
              <p className="text-3xl font-bold text-chart-2">{market.growthRate}</p>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Annual Growth Rate
            </p>
          </CardContent>
        </Card>

        <Card className="border-card-border">
          <CardContent className="pt-6 text-center">
            <p className="text-lg font-semibold">{market.keyTrend}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Key Market Trend
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-card-border">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Market Opportunities</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {market.opportunities.map((opportunity, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-chart-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{opportunity}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
