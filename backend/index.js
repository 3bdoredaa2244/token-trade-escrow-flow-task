const express = require("express");
const bodyParser = require("body-parser");
const escrowRoutes = require("./routes/escrow");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use("/api/escrow", escrowRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
