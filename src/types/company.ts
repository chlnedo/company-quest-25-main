export interface Company {
  id: number;
  name: string;
  industry: string;
  location: string;
  employees: number;
  founded: number;
  description: string;
}

export type SortOption = 'name-asc' | 'name-desc' | 'employees-asc' | 'employees-desc' | 'founded-asc' | 'founded-desc';
