/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execSync, ExecSyncOptions } from "child_process";
import { dirSize, fileSize } from "./utils/size.js";
import { allFolders } from "./utils/fs.js";
import { existsSync, mkdtempSync, readdirSync, rmSync } from "fs";
import { Options, Sizes } from "./types/index.js";
import { extname, join } from "path";

export const remote = (name: string, options?: Options): Sizes => {
  const { tempDir, verbose } = options ?? { tempDir: "temp" };

  const config: ExecSyncOptions = verbose
    ? { stdio: [0, 1, 2] }
    : { stdio: "ignore" };

  const initialDir = process.cwd();
  // @ts-expect-error: tempDir can never be null or undefined.
  const dir = mkdtempSync(tempDir);

  process.chdir(dir);

  execSync("npm init -y", config);
  execSync(`npm i ${name} --omit=dev`, config);

  const unpacked = dirSize("node_modules", [".package-lock.json"]);

  const minzipp = allFolders("node_modules").filter((value) =>
    readdirSync(value).includes("package.json")
  );

  for (let i = 0; i < minzipp.length; i++) {
    const current = minzipp[i];

    execSync(`cd ${current} && npm pack`, config);
  }

  const tarGzipped = minzipp.reduce(
    (acc, curr) =>
      acc +
      fileSize(
        join(
          curr,
          readdirSync(curr).filter((value) => extname(value) === ".tgz")[0]
        )
      ),
    0
  );

  process.chdir(initialDir);

  rmSync(dir, { recursive: true, force: true });

  return {
    tarGzipped,
    unpacked,
  };
};

export const local = (src: string, options?: Options): Sizes => {
  const { verbose } = options ?? {};

  const config: ExecSyncOptions = verbose
    ? { stdio: [0, 1, 2] }
    : { stdio: "ignore" };

  const initialDir = process.cwd();
  const dir = join(initialDir, src);

  process.chdir(dir);

  execSync("npm i --omit=dev", config);

  const unpacked = dirSize("./", [".package-lock.json", "package-lock.json"]);

  execSync(`npm pack`, config);

  let tarGzipped = fileSize(
    readdirSync("./").filter((value) => extname(value) === ".tgz")[0]
  );

  if (existsSync("node_modules")) {
    const minzipp = allFolders("node_modules").filter((value) =>
      readdirSync(value).includes("package.json")
    );

    for (let i = 0; i < minzipp.length; i++) {
      const current = minzipp[i];

      execSync(`cd ${current} && npm pack`, config);
    }

    tarGzipped += minzipp.reduce(
      (acc, curr) =>
        acc +
        fileSize(
          join(
            curr,
            readdirSync(curr).filter((value) => extname(value) === ".tgz")[0]
          )
        ),
      0
    );
  }

  rmSync("node_modules", { recursive: true, force: true, maxRetries: 1 });
  rmSync(readdirSync("./").filter((value) => extname(value) === ".tgz")[0]);
  rmSync("package-lock.json");

  process.chdir(initialDir);

  return {
    unpacked,
    tarGzipped,
  };
};
