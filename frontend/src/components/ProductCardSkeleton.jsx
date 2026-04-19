// frontend/src/components/ProductCardSkeleton.jsx
export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden bg-white border border-gray-100 rounded-2xl">
      {/* Image area */}
      <div className="w-full skeleton h-36" />

      {/* Info area */}
      <div className="flex flex-col gap-2 p-3">
        {/* Rating */}
        <div className="w-12 h-3 rounded-full skeleton" />
        {/* Name */}
        <div className="skeleton h-3.5 w-full rounded-full" />
        <div className="skeleton h-3.5 w-3/4 rounded-full" />
        {/* Unit */}
        <div className="w-10 h-3 rounded-full skeleton" />
        {/* Price + button */}
        <div className="flex items-center justify-between mt-1">
          <div className="w-12 h-4 rounded-full skeleton" />
          <div className="w-16 h-8 rounded-lg skeleton" />
        </div>
      </div>
    </div>
  );
}
