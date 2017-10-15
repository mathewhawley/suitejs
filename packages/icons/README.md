# icons

[![npm (scoped)](https://img.shields.io/npm/v/@suitejs/icons.svg?style=flat-square)](https://www.npmjs.com/package/@suitejs/icons) [![David](https://david-dm.org/suitejs/suitejs/status.svg?path=packages/icons&style=flat-square)](https://david-dm.org/suitejs/suitejs?path=packages/icons)

A unified collection of SVG icons built for React.

## Installation

```
$ npm install --save @suitejs/icons
```

## Usage

Icon sets are located in name-spaced directories. You can use named imports (if your toolchain supports tree-shaking or dead-code elimination), or import icon modules individually:

```js
import { SpFacebook } from '@suitejs/icons/sp';
```

or

```js
import SpFacebook from '@suitejs/icons/sp/Facebook';
```

> ℹ️  You can find all import paths in the [docs](https://github.com/suitejs/suitejs/blob/master/packages/icons/docs).

---

If you are using **CommonJS** modules, you will find them under the `/lib` directory:

```js
var SpFacebook = require('@suitejs/icons/lib/sp').SpFacebook;
```

If your environment supports ES6 destructuring syntax:

```js
var { SpFacebook, SpYouTube } = require('@suitejs/icons/lib/sp');
```

You can also access modules individually:

```js
var SpYouTube = require('@suitejs/icons/lib/sp/YouTube');
```

## Configuration

`icons` uses [`icon-base`](https://github.com/suitejs/suitejs/tree/master/packages/icon-base) to set common settings. You can configure global settings for all your icons via React's context API. You can roll your own 'provider', or use the [`IconProvider`](https://github.com/suitejs/suitejs/tree/master/packages/icon-base#global-configuration) from the [`icon-base`](https://github.com/suitejs/suitejs/tree/master/packages/icon-base) package.

Global settings can be overriden inline:

```js
<CheckBox fill="#000000" size="0.75em" aria-hidden={false} />
```

To see what defaults are applied, refer to the [`icon-base`](https://github.com/suitejs/suitejs/tree/master/packages/icon-base) documentation.

## Sets

| Name | Location |
| --- | --- |
| [Social Platforms](https://github.com/suitejs/suitejs/blob/master/packages/icons/docs/sp.md) | `@suitejs/icons/sp` |
| [Material Design](https://github.com/suitejs/suitejs/blob/master/packages/icons/docs/md.md) | `@suitejs/icons/md` |
| [Developer](https://github.com/suitejs/suitejs/blob/master/packages/icons/docs/dv.md) | `@suitejs/icons/dv`

## Goals

The goal for this library, is to provide commonly used icons in a uniform format. You should be free to mix and match icons from different sets and expect them to behave/render in a consistent manner.

All icons are set up on a 48 &times; 48 grid. They have all been scaled to achieve as consistent a weighting across the board as possible.
