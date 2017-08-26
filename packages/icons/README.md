# icons

[![npm (scoped)](https://img.shields.io/npm/v/@suitejs/icons.svg?style=flat-square)](https://www.npmjs.com/package/@suitejs/icons) [![David](https://david-dm.org/suitejs/suitejs/status.svg?path=packages/icons&style=flat-square)](https://david-dm.org/suitejs/suitejs?path=packages/icons)

A unified collection of SVG icons built for React.

## Installation

```
$ npm install --save @suitejs/icons
```

## Usage

Icon sets are located in name-spaced directories. For example, if you wanted to use a Facebook icon you would find it under the 'Social Platforms' set:

```js
import React from 'react';
import { SpFacebook } from '@suitejs/icons/sp';

class MyComponent extends React.Component {
  render() {
    return (
      <a href="...">
        <SpFacebook /> Follow us on Facebook
      </a>
    );
  }
}
```
All exports are named - you can refer to the [docs](docs) for the full listings for each set.

If you are using **CommonJS** modules, you can access them like so:

```js
var SpFacebook = require('@suitejs/icons/lib/sp').SpFacebook;
```

or, if your environment supports ES6 destructuring syntax:

```js
var { SpFacebook, SpYouTube } = require('@suitejs/icons/lib/sp');
```

`icons` uses [`icon-base`](https://github.com/suitejs/suitejs/tree/master/packages/icon-base) to set common settings. You can configure global settings for all your icons via React's context API. You can roll your own 'provider', or use the [`IconProvider`](https://github.com/suitejs/suitejs/tree/master/packages/icon-base#global-configuration) from the [`icon-base`](https://github.com/suitejs/suitejs/tree/master/packages/icon-base) package.

## Sets

| Name | Location |
| --- | --- |
| [Social Platforms](https://github.com/suitejs/suitejs/blob/master/packages/icons/docs/sp.md) | `@suitejs/icons/sp` |

## Goals

The goal for this library, is to provide commonly used icons in a uniform format. You should be free to mix and match icons from different sets and expect them to behave/render in a consistent manner.

All icons are set up on a 48 &times; 48 grid. They have all been scaled to achieve as consistent a weighting across the board as possible.
