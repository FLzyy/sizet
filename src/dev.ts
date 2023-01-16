import { remote } from "./index.js";

console.log(
  await remote("react@latest", {
    cwd: "scripts/",
    output: "out.json",
    tempDir: "test",
  })
);
