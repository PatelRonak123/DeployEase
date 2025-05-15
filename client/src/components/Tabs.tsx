import { Tabs as UITabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tabs({ activeTab, setActiveTab }: TabsProps) {
  return (
    <div className="relative border-b border-gray-200 mb-8">
      <UITabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="flex space-x-8 bg-transparent">
          <TabsTrigger 
            value="product-submission"
            className="py-4 px-1 font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:text-gray-500 data-[state=inactive]:border-transparent focus:outline-none transition-colors"
          >
            Product Submission
          </TabsTrigger>
          <TabsTrigger 
            value="my-products"
            className="py-4 px-1 font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:text-gray-500 data-[state=inactive]:border-transparent focus:outline-none transition-colors"
          >
            My Products
          </TabsTrigger>
        </TabsList>
      </UITabs>
    </div>
  );
}
