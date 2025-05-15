import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce.number().positive("Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  onSuccess?: () => void;
}

export default function ProductForm({ onSuccess }: ProductFormProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: undefined,
      description: "",
      imageUrl: "",
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const response = await apiRequest("POST", "/api/products", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      form.reset();
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      
      if (onSuccess) {
        setTimeout(() => onSuccess(), 1000);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    // Handle empty imageUrl field
    const submissionData = {
      ...data,
      imageUrl: data.imageUrl || undefined,
    };
    
    createProductMutation.mutate(submissionData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="bg-white shadow-sm">
        <CardContent className="pt-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Add a New Product</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Product Name*</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Modern Office Chair"
                        className="px-4 py-2 focus:ring-2 focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Price ($)*</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="e.g. 49.99"
                        className="px-4 py-2 focus:ring-2 focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Description*</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your product in detail..."
                        className="px-4 py-2 focus:ring-2 focus:ring-primary"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        className="px-4 py-2 focus:ring-2 focus:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <p className="mt-1 text-sm text-gray-500">Provide a URL to an image of your product</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto px-6 py-2.5 bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary/50"
                  disabled={createProductMutation.isPending}
                >
                  {createProductMutation.isPending ? "Adding..." : "Add Product"}
                </Button>
              </div>
            </form>
          </Form>
          
          {showSuccess && (
            <div className="mt-6 p-4 bg-green-50 border border-success-500 text-success-500 rounded-md flex items-center">
              <CheckCircle2 className="mr-2 text-lg" />
              <span>Product added successfully!</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
