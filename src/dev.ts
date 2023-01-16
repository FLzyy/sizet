import { remote, local } from "./index.js";

console.log(
  remote("react@latest", {
    tempDir: "test",
  }),
  local("dist")
);
