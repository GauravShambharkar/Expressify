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
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Code className="w-4 h-4 text-gray-600" />
        <label className="text-sm font-medium text-black">{label}</label>
      </div>
      <div className="space-y-2">
        {names.map((name, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => onUpdate(index, e.target.value)}
              placeholder={`Enter ${label.toLowerCase()} name...`}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm
                         placeholder:text-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-black focus:border-black transition-colors disabled:opacity-50"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={onAdd}
              className="p-2 text-black hover:text-gray-700 hover:bg-gray-100 
                         rounded-md transition-colors border border-gray-300 disabled:opacity-50"
              disabled={isLoading}
            >
              <Plus className="w-4 h-4" />
            </button>
            {names.length > 1 && (
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 
                           rounded-md transition-colors border border-gray-300 disabled:opacity-50"
                disabled={isLoading}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
