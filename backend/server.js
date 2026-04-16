const express = require("express");
const cors = require("cors");
const { generateRoute } = require("./routes/generate");
const app = express();

const corsOption = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOption));
app.use(express.json());

app.use("/", generateRoute);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  if (port) await console.log(`Server running on port ${port}`);
  else console.error("Failed to start server: PORT not defined");
});
