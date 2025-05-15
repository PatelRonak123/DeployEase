import { Product } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Default image if none provided
  const imageUrl = product.imageUrl || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450";
  
  // Format price to 2 decimal places
  const formattedPrice = `$${product.price.toFixed(2)}`;
  
  return (
    <Card className="product-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-w-16 aspect-h-9 bg-gray-100">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="object-cover w-full h-48"
          onError={(e) => {
            e.currentTarget.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=450";
          }}
        />
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-800 mb-1">{product.name}</h3>
          <span className="text-primary font-semibold">{formattedPrice}</span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{product.description}</p>
      </CardContent>
    </Card>
  );
}
