# Sizet

Easily Calculate the size of an NPM package

## Basic Usage

```js
import { remote, local } from "sizet";

/**
 * Remote is a function to calculate
 * the size of a dependency hosted
 * on the NPM registry.
 */
remote("react@latest");

/**
 * Local is a function to calculate
 * the size of a dependency ina specific folder
 * it also requires for the folder
 * to have a valid package.json.
 */
local("dist/");
```

Read the full documentation on the [Github Repository](https://github.com/FLzyy/sizet)
