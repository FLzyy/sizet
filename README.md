# Sizet

A CLI tool to calculate the size of an NPM package

## Basic Usage

```sh
npx sizet@latest
```

You can also use a local folder with a package.json:

```sh
npx sizet@latest dist/
```

## Programmatic Usage

```js
import { remote, local } from "sizet";

remote("react@latest");

local("dist/");
```
