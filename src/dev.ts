import { remote } from "./index.js";
import { allFiles } from "./utils/fs.js";

console.log(
  remote("react@latest", {
    cwd: "src/",
    tempDir: "test",
  })
);

console.log(allFiles("src/"));
