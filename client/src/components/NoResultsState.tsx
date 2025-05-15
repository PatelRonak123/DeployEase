import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface NoResultsStateProps {
  onReset: () => void;
}

export default function NoResultsState({ onReset }: NoResultsStateProps) {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <Search className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">No matching products</h3>
      <p className="text-gray-600 mb-3">Try adjusting your search terms</p>
      <Button 
        variant="outline" 
        onClick={onReset}
        className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
      >
        Reset Search
      </Button>
    </div>
  );
}
