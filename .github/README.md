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

## How it works

1. Install all production dependencies of the package.
2. Calculate size of node_modules and use that for `unpacked`
3. Minify all javascript using `@swc/core` and use that for `min`
4. Use `npm pack` to get the tarred and gzipped file of the package and it's dependencies, use it for `tarGzipped`
5. Return the values

## API

#### Example:

```js
import { npmPackageRegex } from "sizet";

npmPackageRegex.test("react@latest"); // true
npmPackageRegex.test("React@latest"); // false
npmPackageRegex.test("react@laest"); // false
npmPackageRegex.test("react+latest"); // false
npmPackageRegex.test("react@13.0.3"); // true
npmPackageRegex.test("react@2.2.0-beta"); // true
```

### `Options`

Interface for valid options that can be passed to both [`remote()`](#remote) and [`local()`](#local).

```ts
{
  tempDir?: string
  // The prefix used for the temp folder, "temp" by default.
  output?: string | false
  // if defined it outputs JSON to the string path, false by default.
  verbose?: boolean
  // Whether or not to pipe stdio of shell commands made by the module, false by default.
}
```

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
 *  min: 7707,
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
 *  min: 7707,
 *  tarGzipped: 13351,
 *  unpacked: 43568
 * }
 */
```

## Other tools

- `sizet-cli` - **TO-DO** CLI tool to enable usage of sizet in the commandline
