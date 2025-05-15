import { ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <ShoppingBag className="text-primary h-5 w-5" />
            <span className="text-gray-800 font-medium">ShopEasy</span>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ShopEasy. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
