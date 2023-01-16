import { remote } from "./index.js";

console.log(
  await remote("react@latest", {
    cwd: "src/",
    output: "out.json",
    tempDir: "test",
  })
);
