// frontend/src/components/ErrorBanner.jsx
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorBanner({
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-50">
        <AlertTriangle size={28} className="text-red-400" />
      </div>
      <h3 className="mb-1 text-lg font-bold text-gray-800">
        Oops! Something went wrong
      </h3>
      <p className="max-w-xs mb-6 text-sm text-gray-500">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 bg-blinkit-green text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 active:scale-95 transition-all"
        >
          <RefreshCw size={15} /> Try Again
        </button>
      )}
    </div>
  );
}
