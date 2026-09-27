import { promises as fs } from "node:fs";
import path from "node:path";
import type { Database } from "./types.js";

const configuredPath = process.env.DATA_FILE;
const dataFile = configuredPath ?? path.resolve(process.cwd(), "data/db.json");
const seedFile = path.resolve(process.cwd(), "data/seed.json");

let writeQueue: Promise<void> = Promise.resolve();

async function ensureDatabase(): Promise<void> {
  try {
    await fs.access(dataFile);
  } catch {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.copyFile(seedFile, dataFile);
  }
}

export async function readDatabase(): Promise<Database> {
  await ensureDatabase();
  const content = await fs.readFile(dataFile, "utf8");
  return JSON.parse(content) as Database;
}

export async function writeDatabase(database: Database): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    const temporary = `${dataFile}.tmp`;
    await fs.writeFile(temporary, JSON.stringify(database, null, 2), "utf8");
    await fs.rename(temporary, dataFile);
  });
  return writeQueue;
}
