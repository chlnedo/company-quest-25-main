import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { SortOption } from "@/types/company";

interface FilterPanelProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedIndustry: string;
  onIndustryChange: (value: string) => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  sortBy: SortOption;
  onSortChange: (value: SortOption) => void;
  industries: string[];
  locations: string[];
}

export const FilterPanel = ({
  searchTerm,
  onSearchChange,
  selectedIndustry,
  onIndustryChange,
  selectedLocation,
  onLocationChange,
  sortBy,
  onSortChange,
  industries,
  locations,
}: FilterPanelProps) => {
  return (
    <Card className="p-6 mb-6 bg-card border-border/50 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 mb-4">
        <SlidersHorizontal className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Filters & Search</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search" className="text-sm font-medium text-foreground">
            Search Companies
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-background border-input focus:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry" className="text-sm font-medium text-foreground">
            Industry
          </Label>
          <Select value={selectedIndustry} onValueChange={onIndustryChange}>
            <SelectTrigger id="industry" className="bg-background border-input">
              <SelectValue placeholder="All Industries" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="text-sm font-medium text-foreground">
            Location
          </Label>
          <Select value={selectedLocation} onValueChange={onLocationChange}>
            <SelectTrigger id="location" className="bg-background border-input">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="sort" className="text-sm font-medium text-foreground">
            Sort By
          </Label>
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
            <SelectTrigger id="sort" className="bg-background border-input">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="employees-desc">Most Employees</SelectItem>
              <SelectItem value="employees-asc">Least Employees</SelectItem>
              <SelectItem value="founded-desc">Newest</SelectItem>
              <SelectItem value="founded-asc">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};
