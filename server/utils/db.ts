import fs from "fs";
import path from "path";

const USERS_PATH = path.join(__dirname, '..', 'data', 'users.json')

if (!fs.existsSync(USERS_PATH)) {
  fs.writeFileSync(USERS_PATH, JSON.stringify({ users: [] }, null, 2))
}

function getFilePath(fileName: string) {
  return path.join(__dirname, "..", "data", fileName);
}

export function readData<T>(fileName: string): T {
  const filePath = getFilePath(fileName);
  const rawData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(rawData);
}

export function writeData<T>(fileName: string, data: T) {
  const filePath = getFilePath(fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function readProducts() {
  return readData<{
    products: any[];
    total: number;
    skip: number;
    limit: number;
  }>("products.json");
}

export function writeProducts(data: unknown) {
  writeData("products.json", data);
}
