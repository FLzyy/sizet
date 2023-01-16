import { readdirSync } from "fs";
import { join } from "path";

export const allFiles = (dir: string): string[] => {
  const initial = readdirSync(dir, { withFileTypes: true });
  const folders = [
    ...initial.map((value) =>
      value.isDirectory()
        ? allFiles(join(dir, value.name))
        : join(dir, value.name)
    ),
  ];

  return folders.flat(9007199254740991);
};

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
