# SuiteJS 👌 <a name="top"></a>

[![Travis branch](https://img.shields.io/travis/suitejs/suitejs/master.svg?style=flat-square)]() [![David](https://img.shields.io/david/dev/suitejs/suitejs.svg?style=flat-square)](https://david-dm.org/suitejs/suitejs?type=dev)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)  [![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A collection of useful React components, built for modern browsers.

> This is a [Lerna](https://lernajs.io/) based repository. If you want to work with this project, it will be necessary to be comfortable with this tool.

## Packages

| Package | Version | Dependencies | DevDependencies |
| --- | --- | --- | --- |
| [`@suitejs/icon-base`](https://github.com/suitejs/suitejs/tree/master/packages/icon-base) | [![npm (scoped)](https://img.shields.io/npm/v/@suitejs/icon-base.svg?style=flat-square)](https://www.npmjs.com/package/@suitejs/icon-base) | [![David](https://david-dm.org/suitejs/suitejs/status.svg?path=packages/icon-base&style=flat-square)](https://david-dm.org/suitejs/suitejs?path=packages/icon-base)

<a name="built-with"></a>
## Built with

* [Lerna](https://lernajs.io/)
* [Babel](https://babeljs.io/)
* [Prettier](https://github.com/prettier/prettier)
* [Jest](https://facebook.github.io/jest/)
* [NPM](https://www.npmjs.com/)

[Back to top](#top)

<a name="prerequisites"></a>
## Prerequisites

* [Lerna](https://lernajs.io/) v2.0.0
* [Node](https://nodejs.org/en/) v8.*
* [NPM](https://www.npmjs.com/) v5.*
* An eye for detail 🕵️

[Back to top](#top)

## Installing / Getting started

First up, clone the repository and change in to the root directory.

Make sure you are running [Node](https://nodejs.org/en/) v8.*. If you use [NVM](https://github.com/creationix/nvm), you can simply run:

```
$ nvm use
```

If [Node](https://nodejs.org/en/) v8.* isn't available, run:

```
$ nvm install
```

This will download, install and switch to the latest [Node](https://nodejs.org/en/) v8.*.

Next, install the dependencies:

```
$ npm install
```

Finally, 'bootstrap' the packages <sup>[[1]](#foot-note)</sup>:

```
$ lerna bootstrap
$ lerna run validate
```

And that's pretty much it! The bootstrap/validate steps should have gone without a hitch :crossed_fingers:.

[Back to top](#top)

---

<a name="foot-note"></a>
<sup>[1]</sup> The `validate` script is used in place of [NPM](https://www.npmjs.com/)'s `prepublish` life-cycle hook, called when using `lerna bootstrap`. It is used to prep the packages for release. It runs the following tasks:

* `clean`
* `lint`
* `test`
* `build:*`

We don't use `prepublish`, `prepare`, or `prepublishOnly` life-cycle hooks as these [behave](https://github.com/npm/npm/issues/16685) [differently](https://github.com/npm/npm/issues/15147) across different versions of [NPM](https://www.npmjs.com/) (and are also poorly documented).

Unfortunately, at the time of writing, there doesn't appear to be a life-cycle hook where we can perform these tasks ONLY prior to packing and publishing (with backwards compatibility), that won't be run by consumers of the package.

[Back to top](#top)
