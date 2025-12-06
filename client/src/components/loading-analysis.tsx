import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Globe, 
  Building2, 
  LayoutGrid, 
  Calendar,
  Sparkles
} from "lucide-react";

const analysisSteps = [
  { icon: Users, label: "Identifying target customers", duration: 2000 },
  { icon: Globe, label: "Analyzing market opportunity", duration: 2500 },
  { icon: Building2, label: "Researching competitors", duration: 2000 },
  { icon: LayoutGrid, label: "Building lean canvas", duration: 1500 },
  { icon: Calendar, label: "Creating MVP roadmap", duration: 2000 },
];

export function LoadingAnalysis() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = analysisSteps[currentStep]?.duration || 2000;
    const increment = 100 / analysisSteps.length;
    
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const target = (currentStep + 1) * increment;
        if (prev < target) {
          return Math.min(prev + 1, target);
        }
        return prev;
      });
    }, stepDuration / increment);

    const stepTimeout = setTimeout(() => {
      if (currentStep < analysisSteps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      }
    }, stepDuration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card className="border-card-border">
        <CardContent className="pt-8 pb-8 space-y-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
            <h2 className="text-2xl font-semibold">Analyzing Your Idea</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our AI is generating a comprehensive business validation report for you.
            </p>
          </div>

          <Progress value={progress} className="h-2" />

          <div className="space-y-3">
            {analysisSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;
              
              return (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? "bg-primary/10 border border-primary/20" 
                      : isComplete 
                        ? "bg-muted/30 opacity-60" 
                        : "opacity-40"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isActive ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`} />
                  </div>
                  <span className={`font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                    {step.label}
                    {isComplete && " ✓"}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
