import { useState, useEffect } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { toast } from "sonner";

const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:3000/api/generate"
    : "https://expressify-beta.vercel.app/api/generate");

const getSavedArray = (key: string): string[] => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [""];
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return [""];
  }
};

export const useBackendForm = () => {
  const [directoryName, setDirectoryName] = useState(() => {
    return localStorage.getItem("backend_directoryName") || "";
  });
  const [controllerNames, setControllerNames] = useState<string[]>(() =>
    getSavedArray("backend_controllerNames"),
  );
  const [middlewareNames, setMiddlewareNames] = useState<string[]>(() =>
    getSavedArray("backend_middlewareNames"),
  );
  const [modelNames, setModelNames] = useState<string[]>(() =>
    getSavedArray("backend_modelNames"),
  );
  const [routeNames, setRouteNames] = useState<string[]>(() =>
    getSavedArray("backend_routeNames"),
  );
  const [schemaNames, setSchemaNames] = useState<string[]>(() =>
    getSavedArray("backend_schemaNames"),
  );
  const [utilNames, setUtilNames] = useState<string[]>(() =>
    getSavedArray("backend_utilNames"),
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem("backend_directoryName", directoryName);
    localStorage.setItem(
      "backend_controllerNames",
      JSON.stringify(controllerNames),
    );
    localStorage.setItem(
      "backend_middlewareNames",
      JSON.stringify(middlewareNames),
    );
    localStorage.setItem("backend_modelNames", JSON.stringify(modelNames));
    localStorage.setItem("backend_routeNames", JSON.stringify(routeNames));
    localStorage.setItem("backend_schemaNames", JSON.stringify(schemaNames));
    localStorage.setItem("backend_utilNames", JSON.stringify(utilNames));
  }, [
    directoryName,
    controllerNames,
    middlewareNames,
    modelNames,
    routeNames,
    schemaNames,
    utilNames,
  ]);

  const addField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const removeField = (
    index: number,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    list: string[],
  ) => {
    if (list.length > 1) {
      setter((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateField = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter((prev) => {
      const newList = [...prev];
      newList[index] = value;
      return newList;
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!directoryName.trim()) {
      toast.error("Please enter a directory name");
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post(
        API_URL,
        {
          directoryName,
          controllerFileName: controllerNames.filter((n) => n.trim()),
          middlewareFileName: middlewareNames.filter((n) => n.trim()),
          modelFileName: modelNames.filter((n) => n.trim()),
          routeFileName: routeNames.filter((n) => n.trim()),
          schemaFileName: schemaNames.filter((n) => n.trim()),
          utilFileName: utilNames.filter((n) => n.trim()),
        },
        {
          responseType: "blob",
        },
      );

      toast.success(`${directoryName} successfully generated`);
      setTimeout(() => {
        saveAs(response.data, `${directoryName}.zip`);
      }, 1500);
    } catch (error) {
      console.error("Error generating backend:", error);
      toast.error("Error generating backend. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    state: {
      directoryName,
      controllerNames,
      middlewareNames,
      modelNames,
      routeNames,
      schemaNames,
      utilNames,
      isLoading,
    },
    actions: {
      setDirectoryName,
      addControllerField: () => addField(setControllerNames),
      addMiddlewareField: () => addField(setMiddlewareNames),
      addModelField: () => addField(setModelNames),
      addRouteField: () => addField(setRouteNames),
      addSchemaField: () => addField(setSchemaNames),
      addUtilField: () => addField(setUtilNames),
      removeControllerField: (i: number) =>
        removeField(i, setControllerNames, controllerNames),
      removeMiddlewareField: (i: number) =>
        removeField(i, setMiddlewareNames, middlewareNames),
      removeModelField: (i: number) =>
        removeField(i, setModelNames, modelNames),
      removeRouteField: (i: number) =>
        removeField(i, setRouteNames, routeNames),
      removeSchemaField: (i: number) =>
        removeField(i, setSchemaNames, schemaNames),
      removeUtilField: (i: number) => removeField(i, setUtilNames, utilNames),
      updateControllerName: (i: number, v: string) =>
        updateField(i, v, setControllerNames),
      updateMiddlewareName: (i: number, v: string) =>
        updateField(i, v, setMiddlewareNames),
      updateModelName: (i: number, v: string) =>
        updateField(i, v, setModelNames),
      updateRouteName: (i: number, v: string) =>
        updateField(i, v, setRouteNames),
      updateSchemaName: (i: number, v: string) =>
        updateField(i, v, setSchemaNames),
      updateUtilName: (i: number, v: string) => updateField(i, v, setUtilNames),
      handleFormSubmit,
    },
  };
};
