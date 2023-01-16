import { remote } from "./index.js";
import { allFiles } from "./utils/fs.js";

console.log(
  await remote("react@latest", {
    tempDir: "test",
  })
);

console.log(allFiles(process.cwd()));
