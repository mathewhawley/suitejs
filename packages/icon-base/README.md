# icon-base

[![npm (scoped)](https://img.shields.io/npm/v/@suitejs/icon-base.svg?style=flat-square&maxAge=86400)](https://www.npmjs.com/package/@suitejs/icon-base)

Base component for creating React SVG icons.

## Installation

```
$ npm install --save @suitejs/icon-base
```

## Usage

```js
import React from 'react';
import IconBase from '@suitejs/icon-base';

function CheckBox(props) {
  return (
    <IconBase viewBox="0 0 48 48" {...props}>
      <title>check box</title>
      <path d="M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM20 34L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z" />
    </IconBase>
  );
}
```

If you are working with **CommonJS** modules, you will need to access the `default` property:

```js
var IconBase = require('@suitejs/icon-base').default;
```

## Props

Any props specified will be passed through and applied to the root `<svg>` element. Several properties come with defaults which can be overriden:

#### fill

Type: `string`<br>
Default: `currentColor`

Applied to the `fill` attribute.

#### size

Type: `string`|`number`<br>
Default: `1em`

Applied to the `width` and `height` attributes.

#### height

Type: `number`|`string`

Applied to the `height` attribute. Overrides **size**.

#### width

Type: `number`|`string`

Applied to the `width` attribute. Overrides **size**.

#### style

Type: `object`<br>
Default:

```js
{
  verticalAlign: 'text-bottom'
}
```

Shallow merged with the default object. Applied to the `style` attribute (inline styles).

#### aria-hidden

Type: `boolean`<br>
Default: `true`

Applied to the `aria-hidden` attribute.
