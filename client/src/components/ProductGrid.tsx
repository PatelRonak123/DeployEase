import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, X } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import EmptyState from "@/components/EmptyState";
import LoadingState from "@/components/LoadingState";
import NoResultsState from "@/components/NoResultsState";

export default function ProductGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search input
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setIsSearching(true);
    
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      setDebouncedQuery(value);
      setIsSearching(false);
    }, 500);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setDebouncedQuery("");
  };

  // Fetch all products or search results
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products/search", debouncedQuery],
    queryFn: async ({ queryKey }) => {
      const query = queryKey[1] as string;
      const url = query ? `/api/products/search?q=${encodeURIComponent(query)}` : "/api/products";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    }
  });

  const hasProducts = products.length > 0;
  const showNoResults = !isLoading && debouncedQuery && !hasProducts;
  const showEmptyState = !isLoading && !debouncedQuery && !hasProducts;
  const showLoadingState = isLoading || isSearching;
  const showSearchResults = !isLoading && !isSearching && hasProducts;

  return (
    <div>
      <div className="mb-6">
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 py-2.5 focus:ring-2 focus:ring-primary"
              placeholder="Search products by name or description..."
            />
          </div>
          
          {searchQuery && (
            <Button
              variant="ghost"
              onClick={clearSearch}
              className="px-4 py-2.5 text-gray-600 hover:text-gray-800"
            >
              Clear
            </Button>
          )}
        </div>
      </div>

      {debouncedQuery && showSearchResults && (
        <div className="max-w-7xl mx-auto mb-6">
          <p className="text-gray-600"><span>{products.length}</span> products found</p>
        </div>
      )}

      {showLoadingState && <LoadingState />}
      
      {showEmptyState && <EmptyState />}
      
      {showNoResults && <NoResultsState onReset={clearSearch} />}
      
      {showSearchResults && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
