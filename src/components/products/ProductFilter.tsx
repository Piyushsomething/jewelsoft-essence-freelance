
import React, { useState, useEffect } from "react";
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
import { getProductCategories, getMaterials, getPriceRange } from "@/data/products";

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

  useEffect(() => {
    onFilterChange(filters);
  }, [filters, onFilterChange]);

  const handleCategoryToggle = (category: string, checked: boolean) => {
    setFilters((prev) => {
      // If "all" is selected, clear other selections
      if (category === "all" && checked) {
        return {
          ...prev,
          category: "all",
          categories: [],
        };
      }
      
      // If a specific category is selected, update the categories array
      const currentCategories = [...(prev.categories || [])];
      
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
      
      return {
        ...prev,
        category: currentCategories.length > 0 ? 
          (currentCategories.length === 1 ? currentCategories[0] : undefined) : 
          "all",
        categories: currentCategories,
      };
    });
  };

  const handlePriceChange = (values: number[]) => {
    if (values.length >= 2) {
      setFilters((prev) => ({
        ...prev,
        priceRange: [values[0], values[1]] as [number, number],
      }));
    }
  };

  const handleMaterialToggle = (material: string, checked: boolean) => {
    setFilters((prev) => {
      const currentMaterials = [...(prev.materials || [])];
      
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

      return {
        ...prev,
        materials: currentMaterials,
      };
    });
  };

  const handleStockToggle = (checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      onlyInStock: checked,
    }));
  };

  const handleSortChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      sortBy: value as "newest" | "price-low-high" | "price-high-low" | "popular",
    }));
  };

  const handleReset = () => {
    setFilters({
      category: "all",
      priceRange: minMaxPrice,
      materials: [],
      onlyInStock: false,
      sortBy: "newest",
      searchQuery: "",
      categories: [],
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simply prevents form submission, the filter is already updated on input change
  };

  return (
    <div className="space-y-6">
      {/* Search Filter (Mobile) */}
      <div className="md:hidden">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="search"
            placeholder="Search products..."
            value={filters.searchQuery}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            className="flex-1"
          />
          <Button type="submit" className="shrink-0">
            Search
          </Button>
        </form>
      </div>

      {/* Sort By (Mobile) */}
      <div className="md:hidden">
        <Label htmlFor="mobile-sort">Sort By</Label>
        <Select
          value={filters.sortBy}
          onValueChange={handleSortChange}
        >
          <SelectTrigger id="mobile-sort">
            <SelectValue placeholder="Sort products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="popular">Popularity</SelectItem>
          </SelectContent>
        </Select>
      </div>

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
                    className="ml-2 text-sm capitalize cursor-pointer"
                  >
                    {category === "all" ? "All Categories" : category}
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
            <div className="space-y-4">
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
              />
              <div className="flex justify-between text-sm">
                <span>{formatPrice(filters.priceRange?.[0] || minMaxPrice[0])}</span>
                <span>{formatPrice(filters.priceRange?.[1] || minMaxPrice[1])}</span>
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
        className="w-full"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default ProductFilter;
