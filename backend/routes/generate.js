const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");
const { Router } = require("express");
const generateRoute = Router();

generateRoute.get("/", (_, res) => {
  res.send({
    msg: "health is well and good",
    status: 200,
  });
});

generateRoute.post("/generate", async (req, res) => {
  const {
    directoryName,
    controllerFileName,
    middlewareFileName,
    modelFileName,
    routeFileName,
    schemaFileName,
    utilFileName,
  } = req.body;

  if (!directoryName) {
    return res
      .status(400)
      .json({ error: "Folder name and file name are required" });
  }

  try {
    const archive = archiver("zip", { zlib: { level: 9 } });

    res.attachment(`${directoryName}.zip`);

    // Pipe the archive directly to the response only
    archive.pipe(res);

    // listen for archiver errors
    // archive.on("error", (err) => {
    //   console.error("Archiver error:", err);
    //   res.status(500).end();
    // });

    // // optional: log when done
    // archive.on("end", () => {
    //   console.log("Archive finalized. Total bytes:", archive.pointer());
    // });

    const serverFileContent = await fs.readFileSync(
      path.join(__dirname, "../readBackend/server.js"),
    );
    archive.append(serverFileContent, { name: `${directoryName}/server.js` });

    archive.append(" ", { name: `${directoryName}/.gitignore` });
    archive.append(" ", { name: `${directoryName}/.env` });

    // Add controller files
    if (
      controllerFileName &&
      fs.existsSync(
        path.join(__dirname, "../readBackend/controllers/controller.js"),
      )
    ) {
      // const controllerFileNames = controllerFileName.split(",");
      const controller_fileContent = fs.readFileSync(
        path.join(__dirname, "../readBackend/controllers/controller.js"),
      );

      controllerFileName.forEach((fileName) => {
        archive.append(controller_fileContent, {
          name: `${directoryName}/controllers/${fileName.trim()}.js`,
        });
      });
    }

    // Add middleware files
    if (
      middlewareFileName &&
      fs.existsSync(
        path.join(__dirname, "../readBackend/middleware/middleware.js"),
      )
    ) {
      // const middlewareFileNames = middlewareFileName.split(",");
      const middleware_fileContent = fs.readFileSync(
        path.join(__dirname, "../readBackend/middleware/middleware.js"),
      );

      middlewareFileName.forEach((fileName) => {
        archive.append(middleware_fileContent, {
          name: `${directoryName}/middleware/${fileName.trim()}.js`,
        });
      });
    }

    // Add model files
    if (
      modelFileName &&
      fs.existsSync(path.join(__dirname, "../readBackend/Models/model.js"))
    ) {
      // const modelFileNames = modelFileName.split(",");
      const model_fileContent = fs.readFileSync(
        path.join(__dirname, "../readBackend/Models/model.js"),
      );

      modelFileName.forEach((fileName) => {
        archive.append(model_fileContent, {
          name: `${directoryName}/Models/${fileName.trim()}.js`,
        });
      });
    }

    // add readme file

    const readmeFile_Path = path.join(__dirname, "../readBackend/readme.md");
    const readFile_Content = fs.readFileSync(readmeFile_Path);
    archive.append(readFile_Content, {
      name: `${directoryName}/readme.md`,
    });

    // Add schema files
    if (
      schemaFileName &&
      fs.existsSync(
        path.join(__dirname, "../readBackend/Models/schemas/schema.js"),
      )
    ) {
      // const schemaFileNames = schemaFileName.split(",");
      const schema_fileContent = fs.readFileSync(
        path.join(__dirname, "../readBackend/Models/schemas/schema.js"),
      );

      schemaFileName.forEach((fileName) => {
        archive.append(schema_fileContent, {
          name: `${directoryName}/Models/schemas/${fileName.trim()}.js`,
        });
      });
    }

    // Add route files
    if (
      routeFileName &&
      fs.existsSync(path.join(__dirname, "../readBackend/routes/_route.js"))
    ) {
      // const routeFileNames = routeFileName.split(",");
      const route_fileContent = fs.readFileSync(
        path.join(__dirname, "../readBackend/routes/_route.js"),
      );

      routeFileName.forEach((fileName) => {
        archive.append(route_fileContent, {
          name: `${directoryName}/routes/${fileName.trim()}.js`,
        });
      });
    }

    // Add utility files
    if (
      utilFileName &&
      fs.existsSync(path.join(__dirname, "../readBackend/utils.js"))
    ) {
      // const utilFileNames = utilFileName.split(",");
      const util_fileContent = fs.readFileSync(
        path.join(__dirname, "../readBackend/utils.js"),
      );

      utilFileName.forEach((fileName) => {
        archive.append(util_fileContent, {
          name: `${directoryName}/utils/${fileName.trim()}.js`,
        });
      });
    }

    // package.json content
    if (fs.existsSync(path.join(__dirname, "../readBackend/package.json"))) {
      const package_jsonContent = fs.readFileSync(
        path.join(__dirname, "../readBackend/package.json"),
      );
      archive.append(package_jsonContent, {
        name: `${directoryName}/package.json`,
      });
    }



    // node_modules content
    // const nodeModuleDir = path.join(__dirname, "../node_modules");
    // if (fs.existsSync(nodeModuleDir)) {
    //   await archive.directory(nodeModuleDir, `${directoryName}/node_modules`);
    // }

    // config.js content
    if (fs.existsSync(path.join(__dirname, "../readBackend/config.js"))) {
      const config_fileContent = fs.readFileSync(
        path.join(__dirname, "../readBackend/config.js"),
      );
      archive.append(config_fileContent, {
        name: `${directoryName}/config.js`,
      });
    }

    archive.finalize();

    console.log(
      `ZIP file generated successfully for directory: ${directoryName}`,
    );
  } catch (err) {
    console.error("Error generating ZIP file:", err);
    res.status(500).json({ error: "Error generating file." });
  }
});

module.exports = { generateRoute };
