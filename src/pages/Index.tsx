import { useState, useCallback, useEffect } from "react";
import { Building2 } from "lucide-react";
import { CompanyCard } from "@/components/CompanyCard";
import { CompanyCardSkeleton } from "@/components/CompanyCardSkeleton";
import { FilterPanel } from "@/components/FilterPanel";
import { Pagination } from "@/components/Pagination";
import { ErrorState } from "@/components/ErrorState";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SortOption } from "@/types/company";
import { useCompanies } from "@/hooks/useCompanies";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const {
    companies,
    filteredCount,
    totalCount,
    totalPages,
    industries,
    locations,
    isLoading,
    error,
    retry,
  } = useCompanies({
    searchTerm,
    selectedIndustry,
    selectedLocation,
    sortBy,
    currentPage,
    itemsPerPage,
  });

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }, []);

  const handleIndustryChange = useCallback((value: string) => {
    setSelectedIndustry(value);
    setCurrentPage(1);
  }, []);

  const handleLocationChange = useCallback((value: string) => {
    setSelectedLocation(value);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((value: SortOption) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const handleItemsPerPageChange = useCallback((value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Company Directory
                </h1>
                <p className="text-sm text-muted-foreground">
                  Explore and filter companies by industry, location, and more
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FilterPanel
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedIndustry={selectedIndustry}
          onIndustryChange={handleIndustryChange}
          selectedLocation={selectedLocation}
          onLocationChange={handleLocationChange}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          industries={industries}
          locations={locations}
        />

        {!isLoading && !error && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredCount}</span> of{" "}
              <span className="font-semibold text-foreground">{totalCount}</span> companies
            </p>
          </div>
        )}

        {error && <ErrorState message={error} onRetry={retry} />}

        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <CompanyCardSkeleton key={index} />
            ))}
          </div>
        )}

        {!isLoading && !error && companies.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <Building2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No companies found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search term
            </p>
          </div>
        )}

        {!isLoading && !error && companies.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
              {companies.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredCount}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Index;
