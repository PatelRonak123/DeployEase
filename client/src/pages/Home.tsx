import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductForm from "@/components/ProductForm";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  const [activeTab, setActiveTab] = useState("product-submission");

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs
        defaultValue="product-submission"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="relative border-b border-gray-200 mb-8">
          <TabsList className="flex space-x-8 bg-transparent">
            <TabsTrigger
              value="product-submission"
              className="py-4 px-1 font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:text-gray-500 data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent focus:outline-none transition-colors"
            >
              Product Submission
            </TabsTrigger>
            <TabsTrigger
              value="my-products"
              className="py-4 px-1 font-medium data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=inactive]:text-gray-500 data-[state=inactive]:border-b-2 data-[state=inactive]:border-transparent focus:outline-none transition-colors"
            >
              My Products
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="product-submission" className="mt-2">
          <ProductForm onSuccess={() => setActiveTab("my-products")} />
        </TabsContent>

        <TabsContent value="my-products" className="mt-2">
          <ProductGrid />
        </TabsContent>
      </Tabs>
    </div>
  );
}
