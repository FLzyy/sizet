import { readdirSync } from "fs";

export const allFiles = (dir: string): string[] => {
  let files: string[] = [];
  const initial = readdirSync(dir, { withFileTypes: true });

  for (let i = 0; i < initial.length; i++) {
    const current = initial[i];

    if (current.isDirectory()) {
      files = [...files, ...allFiles(current.name)];
    }

    if (current.isFile()) {
      files.push(current.name);
    }
  }

  return files;
};
