import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-white dark:bg-[#0A0A0A]">
      <Loader2 className="h-10 w-10 animate-spin text-gray-900 dark:text-gray-100" />
      <p className="mt-4 text-sm font-medium text-gray-600 dark:text-gray-400">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingSpinner;