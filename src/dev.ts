import { remote } from "./index.js";

console.log(
  remote("chalk@latest", {
    cwd: "src/",
    tempDir: "test",
  })
);
