import { readdir, stat } from "fs/promises";
import { join } from "path";

export const dirSize = async (dir: string): Promise<number> => {
  const files = await readdir(dir, { withFileTypes: true });

  const paths = files.map(async (file) => {
    const path = join(dir, file.name);

    if (file.isDirectory()) return await dirSize(path);

    if (file.isFile()) {
      const { size } = await stat(path);

      return size;
    }

    return 0;
  });

  return (await Promise.all(paths)).flat(Infinity).reduce(
    (i, size) => i + size,
    0,
  );
};

export const fileSize = async (file: string): Promise<number> => {
  return (await stat(file)).size;
};
