import { remote } from "./index.js";

console.log(
  remote("chalk@latest", {
    tempDir: "test",
  })
);
