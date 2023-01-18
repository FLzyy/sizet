# Sizet

[![npm version](https://img.shields.io/npm/v/sizet.svg)](https://www.npmjs.com/package/sizet)
[![npm version](https://img.shields.io/npm/dw/sizet.svg)](https://www.npmjs.com/package/sizet)
[![CodeFactor](https://www.codefactor.io/repository/github/flzyy/sizet/badge)](https://www.codefactor.io/repository/github/flzyy/sizet)

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

## How it works

1. Install all production dependencies of the package.
2. Calculate size of node_modules and use that for `unpacked`
3. Use `npm pack` to get the tarred and gzipped file of the package and it's dependencies, use it for `tarGzipped`
4. Return the values

## API

### `remote(name: string, options?: Options)`

A function that calculates the size of an NPM package hosted on the NPM registry.

#### Arguments

- name: `string` - The name of the NPM package.
- options (**?**): [`Options`](#options) - Options.

#### Example

```js
import { remote } from "sizet";

remote("chalk@latest");

/**
 * {
 *  tarGzipped: 13351,
 *  unpacked: 43568
 * }
 */
```

### `local(src: string, options?: Options)`

A function that calculates the size of an NPM package locally.

#### Arguments

- src: `string` - The folder of the NPM package, must have a valid package.json.
- options (**?**): [`Options`](#options) - Options.

#### Example

```js
import { local } from "sizet";

/**
 * dist/
 *  - README.md
 *  - index.js
 *  - package.json
 */

local("dist/"); // or "dist"

/**
 * {
 *  tarGzipped: 13351,
 *  unpacked: 43568
 * }
 */
```

### `Options`

Interface for valid options that can be passed to both [`remote()`](#remote) and [`local()`](#local).

```ts
{
  tempDir?: string
  // The prefix used for the temp folder, "temp" by default.
  verbose?: boolean
  // Whether or not to pipe stdio of shell commands made by the module, false by default.
}
```

### `Final`

The output of both [`remote()`](#remote) and [`local()`](#local).

**_All values are in bytes_**

```ts
{
  tarGzipped: number;
  // Size of package and it's dependencies after it's tarred and gzipped by `npm pack`.
  unpacked: number;
  // The raw size of the the package and it's dependencies.
}
```

## Other tools

- [**sizet-cli**](https://github.com/FLzyy/sizet-cli) - CLI tool to enable usage of sizet in the command line
