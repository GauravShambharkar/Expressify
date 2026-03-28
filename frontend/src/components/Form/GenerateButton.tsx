import { Download, Loader2 } from "lucide-react";

interface GenerateButtonProps {
  isLoading: boolean;
}

export const GenerateButton = ({ isLoading }: GenerateButtonProps) => (
  <button
    type="submit"
    disabled={isLoading}
    className="w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white font-medium 
               py-3 px-4 rounded-md shadow-sm transition-colors duration-200
               flex items-center justify-center gap-2 focus:outline-none 
               focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed"
  >
    {isLoading ? (
      <>
        <Loader2 className="w-4 h-4 animate-spin" />
        Generating Backend zip file...
      </>
    ) : (
      <>
        <Download className="w-4 h-4" />
        Generate & Download Backend
      </>
    )}
  </button>
);
