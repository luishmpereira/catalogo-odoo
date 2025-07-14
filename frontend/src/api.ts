// src/api.ts
// Simulação de API para o exemplo
import axios from "axios";
import { type Product } from "./types";

export const fetchProducts = async (): Promise<Product[]> => {
  return (await axios.get<{ products: Product[]}>("http://localhost:5000/products?pricelist_id=6")).data.products
};