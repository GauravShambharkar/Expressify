import { Toaster } from "sonner";
import { Code } from "lucide-react";
import { useBackendForm } from "../../hooks/useBackendForm";
import { FormSection } from "./FormSection";
import { FormHeader } from "./FormHeader";
import { GenerateButton } from "./GenerateButton";

function App() {
  const { state, actions } = useBackendForm();
  const {
    directoryName,
    controllerNames,
    middlewareNames,
    modelNames,
    routeNames,
    schemaNames,
    utilNames,
    isLoading,
  } = state;

  return (
    <div className="min-h-screen bg-white py-4 px-4 font-sans antialiased text-black">
      <Toaster visibleToasts={3} position="bottom-center" />
      <div className="max-w-3xl mx-auto">
        <FormHeader />

        <form
          onSubmit={actions.handleFormSubmit}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-5 transition-all hover:shadow-xl"
        >
          <div className="space-y-4">
            {/* Directory Section */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-gray-500" />
                <label className="text-xs font-semibold tracking-wide uppercase text-gray-700">
                  Root Directory Name
                </label>
              </div>
              <input
                type="text"
                value={directoryName}
                onChange={(e) => actions.setDirectoryName(e.target.value)}
                placeholder="Enter root directory name (e.g., backend-api)..."
                className="w-full px-3 py-2 border-2 border-gray-100 rounded-lg shadow-sm text-sm
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-black focus:border-black transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSection
                label="Controllers"
                names={controllerNames}
                isLoading={isLoading}
                onUpdate={actions.updateControllerName}
                onAdd={actions.addControllerField}
                onRemove={actions.removeControllerField}
              />

              <FormSection
                label="Middlewares"
                names={middlewareNames}
                isLoading={isLoading}
                onUpdate={actions.updateMiddlewareName}
                onAdd={actions.addMiddlewareField}
                onRemove={actions.removeMiddlewareField}
              />

              <FormSection
                label="Models"
                names={modelNames}
                isLoading={isLoading}
                onUpdate={actions.updateModelName}
                onAdd={actions.addModelField}
                onRemove={actions.removeModelField}
              />

              <FormSection
                label="Routes"
                names={routeNames}
                isLoading={isLoading}
                onUpdate={actions.updateRouteName}
                onAdd={actions.addRouteField}
                onRemove={actions.removeRouteField}
              />

              <FormSection
                label="Schemas"
                names={schemaNames}
                isLoading={isLoading}
                onUpdate={actions.updateSchemaName}
                onAdd={actions.addSchemaField}
                onRemove={actions.removeSchemaField}
              />

              <FormSection
                label="Utilities"
                names={utilNames}
                isLoading={isLoading}
                onUpdate={actions.updateUtilName}
                onAdd={actions.addUtilField}
                onRemove={actions.removeUtilField}
              />
            </div>

            <div className="pt-4 border-t border-gray-100">
              <GenerateButton isLoading={isLoading} />
            </div>
          </div>
        </form>

        <div className="text-center mt-4 text-xs font-medium text-gray-400 uppercase tracking-widest">
          Build faster, generate cleaner.
        </div>
      </div>
    </div>
  );
}

export default App;
