import express from "express";
import { readProducts, writeProducts } from "../utils/db";
import { requireAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requireAuth, (req, res) => {
  const data = readProducts();

  const limit = Number(req.query.limit) || 20;
  const skip = Number(req.query.skip) || 0;

  const paginated = data.products.slice(skip, skip + limit);

  res.json({
    products: paginated,
    total: data.products.length,
    skip,
    limit,
  });
});

router.get("/search", requireAuth, (req, res) => {
  const data = readProducts();
  const query = String(req.query.q ?? "").toLowerCase();

  const filtered = data.products.filter((p: any) =>
    p.title.toLowerCase().includes(query),
  );

  res.json({
    products: filtered,
    total: filtered.length,
    skip: 0,
    limit: filtered.length,
  });
});

router.get("/:id", requireAuth, (req, res) => {
  const data = readProducts();
  const product = data.products.find(
    (p: any) => p.id === Number(req.params.id),
  );

  if (!product) {
    return res
      .status(404)
      .json({ message: `Product with id '${req.params.id}' not found` });
  }

  res.json(product);
});

router.post("/", requireAuth, (req, res) => {
  const data = readProducts();

  const newProduct = {
    id: Date.now(),
    ...req.body,
  };

  data.products.push(newProduct);
  writeProducts(data);

  res.status(201).json(newProduct);
});

router.put("/:id", requireAuth, (req, res) => {
  const data = readProducts();
  const id = Number(req.params.id);

  const index = data.products.findIndex((p: any) => p.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ message: `Product with id '${id}' not found` });
  }

  data.products[index] = {
    ...data.products[index],
    ...req.body,
    id,
  };

  writeProducts(data);

  res.json(data.products[index]);
});

router.delete("/:id", requireAuth, (req, res) => {
  const data = readProducts();
  const id = Number(req.params.id);

  const index = data.products.findIndex((p: any) => p.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ message: `Product with id '${id}' not found` });
  }

  data.products.splice(index, 1);
  writeProducts(data);

  res.status(204).send();
});

export default router;
