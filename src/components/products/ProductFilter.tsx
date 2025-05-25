import React, { useState, useEffect, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCategory, ProductFilter as FilterType } from "@/types/product";
import { formatPrice } from "@/utils/format";
import { getProductCategories, getMaterials, getPriceRange } from "@/data/productData";
import debounce from "lodash.debounce";

interface ProductFilterProps {
  onFilterChange: (filters: FilterType) => void;
  initialFilters?: FilterType;
}

const ProductFilter = ({
  onFilterChange,
  initialFilters = {},
}: ProductFilterProps) => {
  const categories = ["all", ...getProductCategories()];
  const materials = getMaterials();
  const [minMaxPrice] = useState<[number, number]>(getPriceRange() as [number, number]);
  
  const [filters, setFilters] = useState<FilterType>({
    category: initialFilters.category || "all",
    priceRange: initialFilters.priceRange || minMaxPrice,
    materials: initialFilters.materials || [],
    onlyInStock: initialFilters.onlyInStock || false,
    sortBy: initialFilters.sortBy || "newest",
    searchQuery: initialFilters.searchQuery || "",
    categories: initialFilters.categories || [],
  });

  const [searchInput, setSearchInput] = useState(filters.searchQuery || "");

  const debouncedSearchUpdate = useCallback(
    debounce((value: string) => {
      submitFilterChanges({
        ...filters,
        searchQuery: value
      });
    }, 300),
    [filters]
  );

  // Add this useEffect to sync with parent state changes
  useEffect(() => {
    setFilters({
      category: initialFilters.category || "all",
      priceRange: initialFilters.priceRange || minMaxPrice,
      materials: initialFilters.materials || [],
      onlyInStock: initialFilters.onlyInStock || false,
      sortBy: initialFilters.sortBy || "newest",
      searchQuery: initialFilters.searchQuery || "",
      categories: initialFilters.categories || [],
    });
  }, [initialFilters, minMaxPrice]);

  const submitFilterChanges = (newFilters: FilterType) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryToggle = (category: string, checked: boolean) => {
    const newFilters = { ...filters };

    if (category === "all" && checked) {
      newFilters.category = "all";
      newFilters.categories = [];
    } else {
      const currentCategories = [...(newFilters.categories || [])];

      if (checked) {
        if (!currentCategories.includes(category as ProductCategory)) {
          currentCategories.push(category as ProductCategory);
        }
      } else {
        const index = currentCategories.indexOf(category as ProductCategory);
        if (index > -1) {
          currentCategories.splice(index, 1);
        }
      }

      newFilters.category =
        currentCategories.length > 0
          ? currentCategories.length === 1
            ? currentCategories[0]
            : undefined
          : "all";
      newFilters.categories = currentCategories;
    }

    submitFilterChanges(newFilters);
  };

  const handlePriceChange = (values: number[]) => {
    if (values.length >= 2) {
      const newFilters = { ...filters, priceRange: [values[0], values[1]] as [number, number] };
      submitFilterChanges(newFilters);
    }
  };

  const handleMaterialToggle = (material: string, checked: boolean) => {
    const newFilters = { ...filters };
    const currentMaterials = [...(newFilters.materials || [])];

    if (checked) {
      if (!currentMaterials.includes(material)) {
        currentMaterials.push(material);
      }
    } else {
      const index = currentMaterials.indexOf(material);
      if (index > -1) {
        currentMaterials.splice(index, 1);
      }
    }

    newFilters.materials = currentMaterials;
    submitFilterChanges(newFilters);
  };

  const handleStockToggle = (checked: boolean) => {
    const newFilters = { ...filters, onlyInStock: checked };
    submitFilterChanges(newFilters);
  };

  const handleSortChange = (value: string) => {
    const newFilters = { ...filters, sortBy: value as "newest" | "price-low-high" | "price-high-low" | "popular" };
    submitFilterChanges(newFilters);
  };

  const handleReset = () => {
    const newFilters = {
      category: "all",
      priceRange: minMaxPrice,
      materials: [],
      onlyInStock: false,
      sortBy: "newest",
      searchQuery: "",
      categories: [],
    };
    submitFilterChanges(newFilters);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simply prevents form submission, the filter is already updated on input change
  };

  // Category display names for better UX
  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case "all": return "All Categories";
      case "rings": return "Rings";
      case "necklaces": return "Necklaces";
      case "earrings": return "Earrings";
      case "bracelets": return "Bracelets";
      case "anklets": return "Anklets";
      case "pendants": return "Pendants";
      case "stones": return "Stones";
      default: return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  return (
    <div className="md:h-auto md:overflow-visible flex flex-col h-[calc(100vh-4rem)]">
      {/* Mobile header with search and sort - fixed position */}
      <div className="md:hidden sticky top-0 bg-background z-30 pb-4 border-b shadow-sm">
        <div className="px-4 pt-4 space-y-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="search"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                debouncedSearchUpdate(e.target.value);
              }}
              className="flex-1"
            />
            <Button type="submit" className="shrink-0">
              Search
            </Button>
          </form>

          <div>
            <Label htmlFor="mobile-sort">Sort By</Label>
            <Select
              value={filters.sortBy}
              onValueChange={handleSortChange}
            >
              <SelectTrigger id="mobile-sort">
                <SelectValue placeholder="Sort products" />
              </SelectTrigger>
              <SelectContent position="popper" sideOffset={0}>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="popular">Popularity</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Scrollable filter section */}
      <div className="md:space-y-6 overflow-y-auto flex-1 pb-20">
        <div className="px-4 md:px-0 py-4">
          {/* Accordion Filters */}
          <Accordion type="multiple" defaultValue={["category", "price", "material", "stock"]}>
            {/* Categories */}
            <AccordionItem value="category">
              <AccordionTrigger className="font-playfair">Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={
                          category === "all" 
                            ? (filters.categories || []).length === 0 || filters.category === "all"
                            : (filters.categories || []).includes(category as ProductCategory)
                        }
                        onCheckedChange={(checked) => 
                          handleCategoryToggle(category, checked === true)
                        }
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {getCategoryDisplayName(category)}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Price Range */}
            <AccordionItem value="price">
              <AccordionTrigger className="font-playfair">Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {/* Price display with input fields */}
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-full">
                      <Label htmlFor="min-price" className="text-xs text-muted-foreground mb-1 block">Min</Label>
                      <Input
                        id="min-price"
                        type="number"
                        value={filters.priceRange?.[0] || minMaxPrice[0]}
                        min={minMaxPrice[0]}
                        max={filters.priceRange?.[1] || minMaxPrice[1]}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (isNaN(value)) return;
                          handlePriceChange([value, filters.priceRange?.[1] || minMaxPrice[1]]);
                        }}
                        className="h-8"
                      />
                    </div>
                    <div className="flex items-center pt-6">
                      <span className="text-muted-foreground">-</span>
                    </div>
                    <div className="w-full">
                      <Label htmlFor="max-price" className="text-xs text-muted-foreground mb-1 block">Max</Label>
                      <Input
                        id="max-price"
                        type="number"
                        value={filters.priceRange?.[1] || minMaxPrice[1]}
                        min={filters.priceRange?.[0] || minMaxPrice[0]}
                        max={minMaxPrice[1]}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (isNaN(value)) return;
                          handlePriceChange([filters.priceRange?.[0] || minMaxPrice[0], value]);
                        }}
                        className="h-8"
                      />
                    </div>
                  </div>
                  
                  {/* Slider with improved styling */}
                  <Slider
                    defaultValue={[minMaxPrice[0], minMaxPrice[1]]}
                    min={minMaxPrice[0]}
                    max={minMaxPrice[1]}
                    step={100}
                    value={[
                      filters.priceRange?.[0] || minMaxPrice[0],
                      filters.priceRange?.[1] || minMaxPrice[1],
                    ]}
                    onValueChange={handlePriceChange}
                    className="mt-6"
                    thumbClassName="w-5 h-5 bg-gold border-2 border-white"
                    aria-label="Price range"
                  />
                  
                  {/* Price range indicators */}
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatPrice(minMaxPrice[0])}</span>
                    <span>{formatPrice(minMaxPrice[1])}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Materials */}
            <AccordionItem value="material">
              <AccordionTrigger className="font-playfair">Materials</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <div key={material} className="flex items-center">
                      <Checkbox
                        id={`material-${material}`}
                        checked={(filters.materials || []).includes(material)}
                        onCheckedChange={(checked) => 
                          handleMaterialToggle(material, checked === true)
                        }
                      />
                      <label
                        htmlFor={`material-${material}`}
                        className="ml-2 text-sm cursor-pointer"
                      >
                        {material}
                      </label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Stock Status */}
            <AccordionItem value="stock">
              <AccordionTrigger className="font-playfair">Availability</AccordionTrigger>
              <AccordionContent>
                <div className="flex items-center">
                  <Checkbox
                    id="in-stock"
                    checked={filters.onlyInStock}
                    onCheckedChange={(checked) => handleStockToggle(!!checked)}
                  />
                  <label htmlFor="in-stock" className="ml-2 text-sm cursor-pointer">
                    In Stock Only
                  </label>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Reset Button */}
          <Button
            variant="outline"
            onClick={handleReset}
            className="w-full my-4"
          >
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;