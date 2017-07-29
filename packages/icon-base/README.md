# icon-base <a name="top"></a>

[![npm (scoped)](https://img.shields.io/npm/v/@suitejs/icon-base.svg?style=flat-square)](https://www.npmjs.com/package/@suitejs/icon-base) [![David](https://david-dm.org/suitejs/suitejs/status.svg?path=packages/icon-base&style=flat-square)](https://david-dm.org/suitejs/suitejs?path=packages/icon-base)

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

Output (with [defaults](#defaults) applied):

```html
<svg version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="1.15em" width="1.15em" aria-hidden="true" viewBox="0 0 48 48" style="vertical-align: text-bottom;">
  <title>check box</title>
  <path d="M38 6H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V10c0-2.21-1.79-4-4-4zM20 34L10 24l2.83-2.83L20 28.34l15.17-15.17L38 16 20 34z"></path>
</svg>
```

If you are working with **CommonJS** modules, you will need to access the `default` property:

```js
var IconBase = require('@suitejs/icon-base').default;
```

[Back to top](#top)

<a name="defaults"></a>
## Defaults

Can be overriden via `props` or [`context`](#global-config).

#### fill

Type: `string`<br>
Default: `currentColor`

Applied to the `fill` attribute.

#### size

Type: `string`|`number`<br>
Default: `1.15em`

Applied to the `width` and `height` attributes.

#### height

Type: `number`|`string`

Applied to the `height` attribute. Takes precendence over **size**.

#### width

Type: `number`|`string`

Applied to the `width` attribute. Takes precendence over **size**.

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

[Back to top](#top)

<a name="global-config"></a>
## Global configuration

`@suitejs/icon-base` exports `IconProvider` as a named export. You can apply settings/styles globally by passing them as `props` to `IconProvider`.

```js
import React from 'react';
import { IconProvider } from '@suitejs/icon-base';

var iconConfig = {
  fill: '#cccccc',
  className: 'icon',
  style: {
    verticalAlign: 'middle',
  },
  // ...
};

function App() {
  return (
    <IconProvider {...iconConfig}>
      {/*
        Any icon components within this tree will receive
        'iconConfig' values
      */}
    </IconProvider>
  );
}

export default App;
```

Global settings can be overriden inline:

```js
<CheckBox fill="#000000" size="0.75em" aria-hidden={false} />
```

If you are working with **CommonJS** modules, you will need to access the `IconProvider` property:

```js
var IconProvider = require('@suitejs/icon-base').IconProvider;
```

[Back to top](#top)
