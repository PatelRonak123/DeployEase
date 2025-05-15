export default function LoadingState() {
  return (
    <div className="text-center py-12">
      <div className="mx-auto w-12 h-12 border-4 border-gray-200 rounded-full border-t-primary animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading products...</p>
    </div>
  );
}
