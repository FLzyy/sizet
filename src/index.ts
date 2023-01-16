/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execSync } from "child_process";
import { dirSize, minifiedSized } from "./utils/size.js";
import { allFiles } from "./utils/fs.js";
import { mkdtempSync, rmSync, writeFileSync } from "fs";
import { Options, Sizes } from "./types/index.js";

export const npmPackageRegex =
  /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*@[~^]?([\dvx*]+(?:[-.](?:[\dx*]+|alpha|beta))*|latest)$/gm;

export const remote = (name: string, options?: Options): Sizes => {
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

  const unpacked = dirSize("node_modules", [".package-lock.json"]);
  const min = allFiles("node_modules").reduce(
    (acc, cur) => acc + minifiedSized(cur),
    0
  );

  process.chdir("..");

  rmSync(dir, { recursive: true, force: true });

  if (cwd) {
    process.chdir("..");
  }

  const final = {
    min,
    minzip: 0,
    unpacked,
  };

  if (output) {
    writeFileSync(output, JSON.stringify(final, null, "\t"));
  }

  return final;
};
