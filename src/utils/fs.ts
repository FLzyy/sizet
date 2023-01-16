import { readdirSync, statSync } from "fs";
import { join } from "path";

export const allFiles = (dir: string): string[] => {
  let files: string[] = [];
  const initial = readdirSync(dir);

  for (let i = 0; i < initial.length; i++) {
    const current = initial[i];
    const path = join(dir, current);
    const stats = statSync(path);

    if (stats.isDirectory()) {
      files = [...files, ...allFiles(path)];
    } else if (stats.isFile()) {
      files.push(path);
    }
  }

  return files;
};
