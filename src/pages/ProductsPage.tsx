import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductFilter from "@/components/products/ProductFilter";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, SlidersHorizontal } from "lucide-react";
import { ProductFilter as FilterType, ProductCategory } from "@/types/product";
import { getFilteredProducts } from "@/data/products";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const updateUrlWithFilters = (filters: FilterType) => {
  const params = new URLSearchParams();
  
  // Only add parameters that have values
  if (filters.category && filters.category !== 'all') {
    params.set('category', filters.category);
  }
  
  if (filters.categories && filters.categories.length > 0) {
    params.set('categories', filters.categories.join(','));
  }
  
  if (filters.searchQuery) {
    params.set('search', filters.searchQuery);
  }
  
  if (filters.priceRange) {
    params.set('priceRange', `${filters.priceRange[0]}-${filters.priceRange[1]}`);
  }
  
  if (filters.materials && filters.materials.length > 0) {
    params.set('materials', filters.materials.join(','));
  }
  
  if (filters.onlyInStock) {
    params.set('inStock', 'true');
  }
  
  if (filters.sortBy && filters.sortBy !== "newest") {
    params.set('sortBy', filters.sortBy);
  }
  
  // Replace current URL without reloading the page
  window.history.replaceState({}, '', 
    params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname
  );
};

const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Parse all filter parameters from URL
  const initialCategory = searchParams.get("category") || "all";
  const initialSearch = searchParams.get("search") || "";
  const initialCategories = searchParams.get("categories")?.split(',') as ProductCategory[] || [];
  const initialMaterials = searchParams.get("materials")?.split(',') || [];
  const initialOnlyInStock = searchParams.get("inStock") === "true";
  const initialSortBy = searchParams.get("sortBy") as "newest" | "price-low-high" | "price-high-low" | "popular" || "newest";

  // Parse price range if present
  let initialPriceRange: [number, number] | undefined = undefined;
  if (searchParams.get("priceRange")) {
    const [min, max] = searchParams.get("priceRange")!.split('-');
    initialPriceRange = [parseInt(min), parseInt(max)];
  }

  const [activeFilters, setActiveFilters] = useState<FilterType>({
    category: initialCategory as ProductCategory | "all",
    searchQuery: initialSearch,
    categories: initialCategories.length > 0 ? initialCategories : 
                (initialCategory !== "all" ? [initialCategory as ProductCategory] : []),
    materials: initialMaterials,
    onlyInStock: initialOnlyInStock,
    sortBy: initialSortBy,
    priceRange: initialPriceRange,
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const [products, setProducts] = useState(getFilteredProducts(activeFilters));
  
  useEffect(() => {
    // Prevent unnecessary filter operations
    const filterString = JSON.stringify(activeFilters);
    
    // Simulate loading
    setIsLoading(true);
    
    const timeoutId = setTimeout(() => {
      const filtered = getFilteredProducts(activeFilters);
      setProducts(filtered);
      setIsLoading(false);
    }, 500);
    
    // Clean up timeout to prevent memory leaks
    return () => clearTimeout(timeoutId);
  }, [JSON.stringify(activeFilters)]); // Use stringified version to properly detect changes
  
  const handleFilterChange = (filters: FilterType) => {
    setActiveFilters(filters);
    updateUrlWithFilters(filters);
  };

  const handleRemoveFilter = (filterKey: keyof FilterType, value?: string) => {
    const newFilters = { ...activeFilters };
    
    if (filterKey === "materials" && value) {
      newFilters.materials = (activeFilters.materials || []).filter(m => m !== value);
      if (newFilters.materials.length === 0) {
        delete newFilters.materials;
      }
    } else if (filterKey === "categories" && value) {
      newFilters.categories = (activeFilters.categories || []).filter(c => c !== value);
      if (newFilters.categories.length === 0) {
        newFilters.category = "all";
        delete newFilters.categories;
      } else if (newFilters.categories.length === 1) {
        newFilters.category = newFilters.categories[0];
      }
    } else if (filterKey === "priceRange") {
      delete newFilters.priceRange;
    } else if (filterKey === "onlyInStock") {
      newFilters.onlyInStock = false;
    } else if (filterKey === "category") {
      newFilters.category = "all";
      delete newFilters.categories;
    } else if (filterKey === "searchQuery") {
      newFilters.searchQuery = "";
    }
    
    // Update URL first, then state
    updateUrlWithFilters(newFilters);
    setActiveFilters(newFilters);
  };
  
  const getActiveFilterLabels = () => {
    const labels = [];
    
    if (activeFilters.categories && activeFilters.categories.length > 0) {
      activeFilters.categories.forEach(cat => {
        labels.push({
          key: "categories" as keyof FilterType,
          value: cat,
          label: `Category: ${cat}`,
        });
      });
    } else if (activeFilters.category && activeFilters.category !== "all") {
      labels.push({
        key: "category" as keyof FilterType,
        value: activeFilters.category,
        label: `Category: ${activeFilters.category}`,
      });
    }
    
    if (activeFilters.priceRange) {
      labels.push({
        key: "priceRange" as keyof FilterType,
        label: `Price Range: ₹${activeFilters.priceRange[0]} - ₹${activeFilters.priceRange[1]}`,
      });
    }
    
    if (activeFilters.materials && activeFilters.materials.length > 0) {
      activeFilters.materials.forEach(material => {
        labels.push({
          key: "materials" as keyof FilterType,
          value: material,
          label: `Material: ${material}`,
        });
      });
    }
    
    if (activeFilters.onlyInStock) {
      labels.push({
        key: "onlyInStock" as keyof FilterType,
        label: "In Stock Only",
      });
    }
    
    if (activeFilters.searchQuery) {
      labels.push({
        key: "searchQuery" as keyof FilterType,
        label: `Search: "${activeFilters.searchQuery}"`,
      });
    }
    
    return labels;
  };
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden md:block w-64 flex-shrink-0 sticky top-24">
            <div className="space-y-6">
              <h1 className="font-playfair text-2xl font-bold">Products</h1>
              <ProductFilter 
                key={JSON.stringify(activeFilters)} // Add this line
                onFilterChange={handleFilterChange} 
                initialFilters={activeFilters}
              />
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Header */}
            <div className="md:hidden space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <h1 className="font-playfair text-2xl font-bold">Products</h1>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-auto flex gap-1 items-center">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>Filters</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">
                      <ProductFilter 
                        key={JSON.stringify(activeFilters)} // Add this line
                        onFilterChange={handleFilterChange} 
                        initialFilters={activeFilters} 
                      />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            {/* Products Info */}
            <div className="flex flex-wrap items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing {products.length} product{products.length !== 1 ? "s" : ""}
              </p>
              
              {/* Sort Dropdown (Desktop) */}
              <div className="hidden md:block">
                <select
                  className="bg-background border border-border rounded px-3 py-1.5 text-sm"
                  value={activeFilters.sortBy || "newest"}
                  onChange={(e) => {
                    const sortValue = e.target.value as "newest" | "price-low-high" | "price-high-low" | "popular";
                    const updatedFilters = { ...activeFilters, sortBy: sortValue };
                    setActiveFilters(updatedFilters);
                    updateUrlWithFilters(updatedFilters);
                  }}
                >
                  <option value="newest">Sort by: Newest</option>
                  <option value="price-low-high">Sort by: Price Low to High</option>
                  <option value="price-high-low">Sort by: Price High to Low</option>
                  <option value="popular">Sort by: Popularity</option>
                </select>
              </div>
            </div>
            
            {/* Active Filters */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {getActiveFilterLabels().map((filter, index) => (
                  <Badge
                    key={`${filter.key}-${filter.value || index}`}
                    variant="outline"
                    className="flex items-center gap-1 px-3 py-1.5"
                  >
                    {filter.label}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRemoveFilter(filter.key, filter.value);
                      }}
                      className="ml-1 rounded-full hover:bg-muted p-0.5"
                      aria-label={`Remove ${filter.label} filter`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                
                {getActiveFilterLabels().length > 0 && (
                  <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newFilters: FilterType = { 
                      category: "all", 
                      categories: [],
                      searchQuery: "",
                      materials: [],
                      onlyInStock: false,
                      sortBy: "newest",
                      // Don't include priceRange to reset it to default
                    };
                    
                    // First update URL then state to avoid multiple renders
                    updateUrlWithFilters(newFilters);
                    setActiveFilters(newFilters);
                  }}
                  className="text-sm"
                >
                  Clear All
                </Button>
                )}
              </div>
            </div>
            
            {/* Products Grid */}
            <ProductGrid
              products={products}
              isLoading={isLoading}
              emptyMessage="No products found. Try adjusting your filters."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
