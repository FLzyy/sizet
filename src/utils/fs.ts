import { readdirSync } from "fs";
import { join } from "path";

export const allFolders = (dir: string): string[] => {
  const initial = readdirSync(dir, { withFileTypes: true }).filter((value) =>
    value.isDirectory()
  );
  const folders = [
    ...initial.map((value) => join(dir, value.name)),
    ...initial.map((value) => allFolders(join(dir, value.name))),
  ];

  return folders.flat(9007199254740991);
};
