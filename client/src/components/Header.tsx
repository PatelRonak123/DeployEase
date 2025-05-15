import { ShoppingBag, User, Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="text-primary h-6 w-6" />
          <h1 className="text-xl font-semibold text-gray-800">ShopEasy</h1>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="text-gray-600 hover:text-gray-800 focus:outline-none" 
            aria-label="User account"
          >
            <User className="h-5 w-5" />
          </button>
          <button 
            className="text-gray-600 hover:text-gray-800 focus:outline-none" 
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
