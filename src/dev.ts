import { remote } from "./index.js";
import { allFiles } from "./utils/fs.js";

console.log(
  await remote("react@latest", {
    cwd: "src/",
    tempDir: "test",
  })
);

console.log(allFiles("src/"));
