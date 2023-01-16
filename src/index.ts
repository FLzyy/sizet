/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execSync, ExecSyncOptions } from "child_process";
import { dirSize, fileSize, minifiedSized } from "./utils/size.js";
import { allFiles, allFolders } from "./utils/fs.js";
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from "fs";
import { Options, Sizes } from "./types/index.js";
import { extname, join } from "path";

export const npmPackageRegex =
  /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*@[~^]?([\dvx*]+(?:[-.](?:[\dx*]+|alpha|beta))*|latest)$/gm;

export const remote = (name: string, options?: Options): Sizes => {
  const { output, tempDir, verbose } = options ?? {};

  const config: ExecSyncOptions = verbose
    ? { stdio: "pipe" }
    : { stdio: "ignore" };

  if (!npmPackageRegex.test(name)) {
    throw new Error("Invalid Package Name");
  }

  const dir = mkdtempSync(tempDir ?? "temp");

  process.chdir(dir);

  execSync("npm init -y", config);
  execSync(`npm i ${name}`, config);

  const unpacked = dirSize("node_modules", [".package-lock.json"]);
  const min = allFiles("node_modules")
    .filter((value) => value.endsWith(".js"))
    .reduce((acc, cur) => acc + minifiedSized(cur), 0);
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

  process.chdir("..");

  rmSync(dir, { recursive: true, force: true });

  const final = {
    min,
    tarGzipped,
    unpacked,
  };

  if (output) {
    writeFileSync(output, JSON.stringify(final, null, "\t"));
  }

  return final;
};

export const local = (src: string, options?: Options): Sizes => {
  const { output, verbose } = options ?? {};

  const config: ExecSyncOptions = verbose
    ? { stdio: "pipe" }
    : { stdio: "ignore" };

  process.chdir(src);

  execSync("npm i", config);

  process.chdir("..");

  const unpacked = dirSize(src, [".package-lock.json", "package-lock.json"]);

  const min = allFiles(src)
    .filter((value) => value.endsWith(".js"))
    .reduce((acc, cur) => acc + minifiedSized(cur), 0);

  execSync(`npm pack`, config);
  process.chdir(src);

  const minzipp = allFolders("node_modules").filter((value) =>
    readdirSync(value).includes("package.json")
  );

  for (let i = 0; i < minzipp.length; i++) {
    const current = minzipp[i];

    execSync(`cd ${current} && npm pack`, config);
  }

  const tarGzipped =
    minzipp.reduce(
      (acc, curr) =>
        acc +
        fileSize(
          join(
            curr,
            readdirSync(curr).filter((value) => extname(value) === ".tgz")[0]
          )
        ),
      0
    ) +
    fileSize(
      readdirSync("../").filter((value) => extname(value) === ".tgz")[0]
    );

  const final = {
    unpacked,
    tarGzipped,
    min,
  };

  if (output) {
    writeFileSync(output, JSON.stringify(final, null, "\t"));
  }

  return final;
};
