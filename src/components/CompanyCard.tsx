import { Building2, Users, Calendar, MapPin } from "lucide-react";
import { Company } from "@/types/company";
import { Card } from "@/components/ui/card";

interface CompanyCardProps {
  company: Company;
}

export const CompanyCard = ({ company }: CompanyCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] bg-gradient-to-b from-card to-card/95 border-border/50">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {company.name}
              </h3>
              <p className="text-sm text-muted-foreground">{company.industry}</p>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {company.description}
        </p>
        
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-foreground">{company.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-foreground">{company.employees}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-foreground">{company.founded}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
