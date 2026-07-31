import express from "express";
import cors from "cors";
import productsRouter from "./routes/products";
import authRouter from "./routes/auth";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use("/products", productsRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
