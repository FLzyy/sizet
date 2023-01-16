import { remote } from "./index.js";

console.log(
  remote("react@latest", {
    tempDir: "test",
  })
);
