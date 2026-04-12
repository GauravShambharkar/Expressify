import { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { toast } from "sonner";

export const useBackendForm = () => {
  const [directoryName, setDirectoryName] = useState("");
  const [controllerNames, setControllerNames] = useState([""]);
  const [middlewareNames, setMiddlewareNames] = useState([""]);
  const [modelNames, setModelNames] = useState([""]);
  const [routeNames, setRouteNames] = useState([""]);
  const [schemaNames, setSchemaNames] = useState([""]);
  const [utilNames, setUtilNames] = useState([""]);
  const [isLoading, setIsLoading] = useState(false);

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
        "http://localhost:3000/generate",
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
      }, 1500)
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
      removeModelField: (i: number) => removeField(i, setModelNames, modelNames),
      removeRouteField: (i: number) => removeField(i, setRouteNames, routeNames),
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
