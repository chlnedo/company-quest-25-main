import { useState, useEffect, useMemo, useCallback } from "react";
import { Company, SortOption } from "@/types/company";
import companiesData from "@/data/companies.json";

interface UseCompaniesProps {
  searchTerm: string;
  selectedIndustry: string;
  selectedLocation: string;
  sortBy: SortOption;
  currentPage: number;
  itemsPerPage: number;
}

export const useCompanies = ({
  searchTerm,
  selectedIndustry,
  selectedLocation,
  sortBy,
  currentPage,
  itemsPerPage,
}: UseCompaniesProps) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simulate API call with loading state
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    const timer = setTimeout(() => {
      try {
        setCompanies(companiesData as Company[]);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load companies. Please try again.");
        setIsLoading(false);
      }
    }, 800); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  // Extract unique values for filters (memoized)
  const industries = useMemo(
    () => Array.from(new Set(companies.map((c) => c.industry))).sort(),
    [companies]
  );

  const locations = useMemo(
    () => Array.from(new Set(companies.map((c) => c.location))).sort(),
    [companies]
  );

  // Filter and sort companies (memoized)
  const filteredCompanies = useMemo(() => {
    let filtered = companies.filter((company) => {
      const matchesSearch = company.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesIndustry =
        selectedIndustry === "all" || company.industry === selectedIndustry;
      const matchesLocation =
        selectedLocation === "all" || company.location === selectedLocation;

      return matchesSearch && matchesIndustry && matchesLocation;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "employees-asc":
          return a.employees - b.employees;
        case "employees-desc":
          return b.employees - a.employees;
        case "founded-asc":
          return a.founded - b.founded;
        case "founded-desc":
          return b.founded - a.founded;
        default:
          return 0;
      }
    });

    return filtered;
  }, [companies, searchTerm, selectedIndustry, selectedLocation, sortBy]);

  // Paginated companies (memoized)
  const paginatedCompanies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCompanies.slice(startIndex, endIndex);
  }, [filteredCompanies, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const retry = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      try {
        setCompanies(companiesData as Company[]);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load companies. Please try again.");
        setIsLoading(false);
      }
    }, 800);
  }, []);

  return {
    companies: paginatedCompanies,
    allCompanies: companies,
    filteredCount: filteredCompanies.length,
    totalCount: companies.length,
    totalPages,
    industries,
    locations,
    isLoading,
    error,
    retry,
  };
};
