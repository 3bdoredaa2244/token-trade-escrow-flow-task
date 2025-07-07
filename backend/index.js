import express from "express";
import bodyParser from "body-parser";
import escrowRoutes from "./routes/escrow.js";
import abi from '../abi/Escrow.json' assert { type: "json" };

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use("/api/escrow", escrowRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
