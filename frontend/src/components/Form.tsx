import { useState } from "react";
import { Download, Code, Plus, Trash2, Loader2 } from "lucide-react";
import axios from "axios";
import { saveAs } from "file-saver";
import { Toaster, toast } from "sonner";

function App() {
  const [directoryName, setDirectoryName] = useState("");
  const [controllerNames, setControllerNames] = useState([""]);
  const [middlewareNames, setMiddlewareNames] = useState([""]);
  const [modelNames, setModelNames] = useState([""]);
  const [routeNames, setRouteNames] = useState([""]);
  const [schemaNames, setSchemaNames] = useState([""]);
  const [utilNames, setUtilNames] = useState([""]);

  const [isLoading, setIsLoading] = useState(false);

  // Add field functions
  const addControllerField = () => {
    setControllerNames([...controllerNames, ""]);
  };

  const addMiddlewareField = () => {
    setMiddlewareNames([...middlewareNames, ""]);
  };

  const addModelField = () => {
    setModelNames([...modelNames, ""]);
  };

  const addRouteField = () => {
    setRouteNames([...routeNames, ""]);
  };

  const addSchemaField = () => {
    setSchemaNames([...schemaNames, ""]);
  };

  const addUtilField = () => {
    setUtilNames([...utilNames, ""]);
  };

  // Remove field functions
  const removeControllerField = (index: number) => {
    if (controllerNames.length > 1) {
      const newList = controllerNames.filter((_, i) => i !== index);
      setControllerNames(newList);
    }
  };

  const removeMiddlewareField = (index: number) => {
    if (middlewareNames.length > 1) {
      const newList = middlewareNames.filter((_, i) => i !== index);
      setMiddlewareNames(newList);
    }
  };

  const removeModelField = (index: number) => {
    if (modelNames.length > 1) {
      const newList = modelNames.filter((_, i) => i !== index);
      setModelNames(newList);
    }
  };

  const removeRouteField = (index: number) => {
    if (routeNames.length > 1) {
      const newList = routeNames.filter((_, i) => i !== index);
      setRouteNames(newList);
    }
  };

  const removeSchemaField = (index: number) => {
    if (schemaNames.length > 1) {
      const newList = schemaNames.filter((_, i) => i !== index);
      setSchemaNames(newList);
    }
  };

  const removeUtilField = (index: number) => {
    if (utilNames.length > 1) {
      const newList = utilNames.filter((_, i) => i !== index);
      setUtilNames(newList);
    }
  };

  // Update field functions
  const updateControllerName = (index: number, value: string) => {
    const newList = [...controllerNames];
    newList[index] = value;
    setControllerNames(newList);
  };

  const updateMiddlewareName = (index: number, value: string) => {
    const newList = [...middlewareNames];
    newList[index] = value;
    setMiddlewareNames(newList);
  };

  const updateModelName = (index: number, value: string) => {
    const newList = [...modelNames];
    newList[index] = value;
    setModelNames(newList);
  };

  const updateRouteName = (index: number, value: string) => {
    const newList = [...routeNames];
    newList[index] = value;
    setRouteNames(newList);
  };

  const updateSchemaName = (index: number, value: string) => {
    const newList = [...schemaNames];
    newList[index] = value;
    setSchemaNames(newList);
  };

  const updateUtilName = (index: number, value: string) => {
    const newList = [...utilNames];
    newList[index] = value;
    setUtilNames(newList);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);


    try {
      // Filter out empty values and join with commas for backend
      // const controllerName = controllerNames
      //   .filter((name) => name.trim() !== "")
      //   .join(",");
      // const middlewareName = middlewareNames
      //   .filter((name) => name.trim() !== "")
      //   .join(",");
      // const modelName = modelNames
      //   .filter((name) => name.trim() !== "")
      //   .join(",");
      // const routeName = routeNames
      //   .filter((name) => name.trim() !== "")
      //   .join(",");
      // const schemaName = schemaNames
      //   .filter((name) => name.trim() !== "")
      //   .join(",");
      // const utilName = utilNames.filter((name) => name.trim() !== "").join(",");

      const response = await axios.post(
        "http://localhost:3000/generate",
        {
          directoryName: directoryName,
          controllerFileName: controllerNames,
          middlewareFileName: middlewareNames,
          modelFileName: modelNames,
          routeFileName: routeNames,
          schemaFileName: schemaNames,
          utilFileName: utilNames,
        },
        {
          responseType: "blob", // Important for file download
        }
      );

      // Create download link
      saveAs(response.data, `${directoryName}.zip`);
      toast.success(`${directoryName} succesfully generated`);
      // alert("Backend generated successfully! Check your downloads folder.");
    } catch (error) {
      console.error("Error generating backend:", error);
      alert("Error generating backend. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <Toaster visibleToasts={3} position="bottom-center" />
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Backend Generator
          </h1>
          <p className="text-gray-600">
            Generate your MERN backend structure with custom components
          </p>
        </div>

        {/* Main Form */}
        <form
          onSubmit={handleFormSubmit}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
        >
          <div className="space-y-6">
            {/* Directory Section - Single field */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-gray-600" />
                <label className="text-sm font-medium text-black">
                  Root Directory Name
                </label>
              </div>
              <input
                type="text"
                value={directoryName}
                onChange={(e) => setDirectoryName(e.target.value)}
                placeholder="Enter root directory name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-black focus:border-black transition-colors"
                required
                disabled={isLoading}
              />
            </div>

            {/* Controller Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-gray-600" />
                <label className="text-sm font-medium text-black">
                  Controller Names
                </label>
              </div>
              <div className="space-y-2">
                {controllerNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        updateControllerName(index, e.target.value)
                      }
                      placeholder="Enter controller name..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm
                                 placeholder:text-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-black focus:border-black transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={addControllerField}
                      className="p-2 text-black hover:text-gray-700 hover:bg-gray-100 
                                 rounded-md transition-colors border border-gray-300 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    {controllerNames.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeControllerField(index)}
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

            {/* Middleware Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-gray-600" />
                <label className="text-sm font-medium text-black">
                  Middleware Names
                </label>
              </div>
              <div className="space-y-2">
                {middlewareNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        updateMiddlewareName(index, e.target.value)
                      }
                      placeholder="Enter middleware name..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm
                                 placeholder:text-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-black focus:border-black transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={addMiddlewareField}
                      className="p-2 text-black hover:text-gray-700 hover:bg-gray-100 
                                 rounded-md transition-colors border border-gray-300 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    {middlewareNames.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeMiddlewareField(index)}
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

            {/* Model Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-gray-600" />
                <label className="text-sm font-medium text-black">
                  Model Names
                </label>
              </div>
              <div className="space-y-2">
                {modelNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updateModelName(index, e.target.value)}
                      placeholder="Enter model name..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm
                                 placeholder:text-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-black focus:border-black transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={addModelField}
                      className="p-2 text-black hover:text-gray-700 hover:bg-gray-100 
                                 rounded-md transition-colors border border-gray-300 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    {modelNames.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeModelField(index)}
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

            {/* Route Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-gray-600" />
                <label className="text-sm font-medium text-black">
                  Route Names
                </label>
              </div>
              <div className="space-y-2">
                {routeNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updateRouteName(index, e.target.value)}
                      placeholder="Enter route name..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm
                                 placeholder:text-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-black focus:border-black transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={addRouteField}
                      className="p-2 text-black hover:text-gray-700 hover:bg-gray-100 
                                 rounded-md transition-colors border border-gray-300 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    {routeNames.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRouteField(index)}
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

            {/* Schema Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-gray-600" />
                <label className="text-sm font-medium text-black">
                  Schema Names
                </label>
              </div>
              <div className="space-y-2">
                {schemaNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updateSchemaName(index, e.target.value)}
                      placeholder="Enter schema name..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm
                                 placeholder:text-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-black focus:border-black transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={addSchemaField}
                      className="p-2 text-black hover:text-gray-700 hover:bg-gray-100 
                                 rounded-md transition-colors border border-gray-300 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    {schemaNames.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSchemaField(index)}
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

            {/* Util Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-gray-600" />
                <label className="text-sm font-medium text-black">
                  Utility Names
                </label>
              </div>
              <div className="space-y-2">
                {utilNames.map((name, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updateUtilName(index, e.target.value)}
                      placeholder="Enter utility name..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm
                                 placeholder:text-gray-400 focus:outline-none focus:ring-2 
                                 focus:ring-black focus:border-black transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={addUtilField}
                      className="p-2 text-black hover:text-gray-700 hover:bg-gray-100 
                                 rounded-md transition-colors border border-gray-300 disabled:opacity-50"
                      disabled={isLoading}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    {utilNames.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeUtilField(index)}
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

            {/* Generate Button */}
            <div className="pt-4 border-t border-gray-200">
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
            </div>
          </div>
        </form>

        <div className="text-center mt-6 text-sm text-gray-500">
          Configure your backend components and download the generated structure
        </div>
      </div>
    </div>
  );
}

export default App;
