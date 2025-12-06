import { 
  Users, 
  Globe, 
  Building2, 
  LayoutGrid, 
  Calendar 
} from "lucide-react";

const navItems = [
  { id: "target-customers", label: "Target Customers", icon: Users },
  { id: "market-overview", label: "Market Overview", icon: Globe },
  { id: "competitors", label: "Competitors", icon: Building2 },
  { id: "lean-canvas", label: "Lean Canvas", icon: LayoutGrid },
  { id: "mvp-roadmap", label: "MVP Roadmap", icon: Calendar },
];

interface ReportNavProps {
  activeSection?: string;
}

export function ReportNav({ activeSection }: ReportNavProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="space-y-1">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">
        Report Sections
      </p>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;

        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover-elevate active-elevate-2 ${
              isActive 
                ? "bg-primary/10 text-primary font-medium" 
                : "text-muted-foreground"
            }`}
            data-testid={`nav-${item.id}`}
          >
            <Icon className="w-4 h-4" />
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
