/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execSync } from "child_process";
import { dirSize } from "./utils/size.js";
import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { Options, Sizes } from "./types/index.js";

export const npmPackageRegex =
  /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*@[~^]?([\dvx*]+(?:[-.](?:[\dx*]+|alpha|beta))*|latest)$/gm;

export const remote = async (
  name: string,
  options?: Options
): Promise<Sizes> => {
  const { output, tempDir, cwd } = options ?? {};

  if (!npmPackageRegex.test(name)) {
    throw new Error("Invalid Package Name");
  }

  if (cwd) {
    process.chdir(cwd);
  }

  const dir = mkdtempSync(tempDir ?? "temp");

  process.chdir(dir);

  execSync("npm init -y");
  execSync(`npm i ${name}`);

  const unpacked = await dirSize("node_modules", [".package-lock.json"]);

  process.chdir("..");

  rmSync(dir, { recursive: true, force: true });

  const final = {
    min: 0,
    minzip: 0,
    unpacked,
  };

  if (output) {
    writeFileSync(output, JSON.stringify(final, null, "\t"));
  }

  return final;
};
