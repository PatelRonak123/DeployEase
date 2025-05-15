import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

export default function EmptyState() {
  const [_, navigate] = useLocation();

  return (
    <div className="text-center py-12">
      <div className="mx-auto w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <ShoppingBag className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">No products yet</h3>
      <p className="text-gray-600 mb-6">Start adding products using the Product Submission tab</p>
      <Button 
        onClick={() => navigate('/?tab=product-submission')} 
        className="px-6 py-2.5 bg-primary hover:bg-primary/90"
      >
        Add Your First Product
      </Button>
    </div>
  );
}
