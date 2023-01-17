/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { join } from "path";
import { readdirSync, statSync } from "fs";

export const dirSize = (dir: string, exclude?: string[]): number => {
  const files = readdirSync(dir, { withFileTypes: true });

  const paths = files.map((file) => {
    const path = join(dir, file.name);

    if (exclude?.includes(file.name)) {
      return 0;
    }

    if (file.isDirectory()) return dirSize(path);

    if (file.isFile()) {
      const { size } = statSync(path);

      return size;
    }

    return 0;
  });

  return paths.flat(Infinity).reduce((i, size) => i + size, 0);
};

export const fileSize = (file: string): number => {
  return statSync(file).size;
};
