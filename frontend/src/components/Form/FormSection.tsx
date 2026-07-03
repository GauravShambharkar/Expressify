import { Plus, Trash2, Code } from "lucide-react";

interface FormSectionProps {
  label: string;
  names: string[];
  isLoading: boolean;
  onUpdate: (index: number, value: string) => void;
  onAdd: () => void;
  onRemove: (index: number) => void;
}

export const FormSection = ({
  label,
  names,
  isLoading,
  onUpdate,
  onAdd,
  onRemove,
}: FormSectionProps) => {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-1.5">
        <Code className="w-3.5 h-3.5 text-gray-500" />
        <label className="text-xs font-semibold tracking-wide uppercase text-gray-600">{label}</label>
      </div>
      <div className="space-y-1.5">
        {names.map((name, index) => (
          <div key={index} className="flex items-center gap-1.5">
            <input
              type="text"
              value={name}
              onChange={(e) => onUpdate(index, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()}...`}
              className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-md shadow-sm text-xs
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-black focus:border-black transition-colors disabled:opacity-50"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={onAdd}
              className="p-1.5 text-black hover:text-gray-700 hover:bg-gray-100 
                         rounded-md transition-colors border border-gray-300 disabled:opacity-50"
              disabled={isLoading}
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            {names.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 
                           rounded-md transition-colors border border-gray-300 disabled:opacity-50"
                disabled={isLoading}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
