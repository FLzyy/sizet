import { remote } from "./index.js";

console.log(
  remote("react@latest", {
    cwd: "src/",
    tempDir: "test",
  })
);
