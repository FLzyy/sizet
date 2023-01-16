/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { readdir, stat } from "fs/promises";
import { join } from "path";
import { minifySync } from "@swc/core";
import { readFileSync, rmSync, writeFileSync } from "fs";

export const dirSize = async (
  dir: string,
  exclude?: string[]
): Promise<number> => {
  const files = await readdir(dir, { withFileTypes: true });

  const paths = files.map(async (file) => {
    const path = join(dir, file.name);

    if (exclude?.includes(file.name)) {
      return 0;
    }

    if (file.isDirectory()) return await dirSize(path);

    if (file.isFile()) {
      const { size } = await stat(path);

      return size;
    }

    return 0;
  });

  return (await Promise.all(paths))
    .flat(Infinity)
    .reduce((i, size) => i + size, 0);
};

export const fileSize = async (file: string): Promise<number> => {
  return (await stat(file)).size;
};

export const minifiedSized = async (file: string): Promise<number> => {
  writeFileSync(
    `${file}min`,
    minifySync(readFileSync(file, "utf-8"), {
      module: true,
      ecma: 2017,
      compress: true,
      mangle: true,
    }).code
  );

  const size = await fileSize(`${file}min`);

  rmSync(`${file}min`);

  return size;
};
