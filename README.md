<a name="top"></a>
# SuiteJS 👌

[![David](https://img.shields.io/david/dev/suitejs/suitejs.svg?style=flat-square)](https://david-dm.org/suitejs/suitejs?type=dev) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/) [![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com)  [![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://opensource.org/licenses/MIT)

A collection of useful React components, built for modern browsers.

## Packages

| Package | Version | Dependencies | DevDependencies |
| --- | --- | --- | --- |
| [`@suitejs/icon-base`](https://github.com/suitejs/suitejs/tree/master/packages/icon-base) | [![npm (scoped)](https://img.shields.io/npm/v/@suitejs/icon-base.svg?style=flat-square&maxAge=86400)](https://www.npmjs.com/package/@suitejs/icon-base) | [![David](https://david-dm.org/suitejs/suitejs/status.svg?path=packages/icon-base&style=flat-square&maxAge=86400)](https://david-dm.org/suitejs/suitejs?path=packages/icon-base)

## Introduction

This is a [Lerna](https://lernajs.io/) based repository, therefore it will be necessary to be comfortable with this tool.

There are a few key areas where some small deviations to the [Lerna](https://lernajs.io/) workflow have been made. These will be made clear throughout this document (⚠️).

If you want an overview of the key technologies used in this codebase before getting set up, check out the [Developing](#developing) section first.

## Installing / Getting started

First up, clone the repository and change in to the root directory.

You should now make sure you are running __Node 8.*__. If you use [NVM](https://github.com/creationix/nvm), you can simply run:

```
$ nvm use
```

If you have a version of __Node 8.*__ it will automatically switch to the latest version you have. If you don't have one, you can just run:

```
$ nvm install
```

Which will download and install the latest __Node 8.*__ version and switch to it for you.

The next step is to install the dependencies:

```
$ npm install
```

Finally, you'll need to 'bootstrap' the packages:

```
$ lerna bootstrap
$ lerna run validate
```

⚠️ The `validate` script is used in place of the `prepublish` life-cycle hook used by `lerna bootstrap` to prep the packages for release. It runs the following tasks:

* `clean`
* `lint`
* `test`
* `build:*`

We don't use `prepublish`, `prepare`, or `prepublishOnly` life-cycle hooks as these [behave](https://github.com/npm/npm/issues/16685) [differently](https://github.com/npm/npm/issues/15147) across different versions of [NPM](https://www.npmjs.com/) (and are also poorly documented).

Unfortunately, at the time of writing, there doesn't seem to be a life-cycle hook where we can perform ONLY pre-publishing tasks (with backwards compatibility), that won't be run by consumers of the package.

We don't want consumers to be downloading development dependencies and running development tasks such as linting, testing and transpiling.

And that's pretty much it 🎉! The bootstrap/validate steps should have gone without a hitch :crossed_fingers:.

[Back to top](#top)

<a name="developing"></a>

## Developing

### Built with

* [Lerna](https://lernajs.io/)
* [React](https://facebook.github.io/react/)
* [Babel](https://babeljs.io/)
* [Prettier](https://github.com/prettier/prettier)
* [ESLint](http://eslint.org/)
* [Jest](https://facebook.github.io/jest/)

### Prerequisites

* Node 8.*
* NPM 5.*
* An eye️ for detail 🕵️

[Back to top](#top)

## Git workflow

### Commits

This repository adheres to the [AngularJS Git Commit Message Conventions](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit) through [`commitizen`](https://github.com/commitizen/cz-cli).

When you are ready to make a commit, you should run:

```
$ npm run cm
```

This will provide step-by-step prompts to help you structure your commit messages. Following this convention allows us to auto-generate change logs, and determine version numbers when we release packages.

We make heavy use of Git's [`rebase`](https://git-scm.com/docs/git-rebase) feature. We aim to keep a [linear history](http://www.bitsnbites.eu/a-tidy-linear-git-history/). You will be required to `rebase` any unnecessary commits (e.g. `fix typo`, `update`).

Feel free to make silly commits while developing locally if you need to (bypassing the `npm run cm` command). However, before making a PR, please make sure you `rebase` and consolidate your commits into meaningful chunks and that the commit messages follow the correct format.

### Hooks

Every time you make a commit, validation tasks will be run to ensure the code you are adding is correctly formatted and doesn't fail any tests. These checks only apply to _staged_ files. This allows you to have messy, in-progress files, but still commit files that are in good order.

This is achieved with the following packages:

* [`husky`](https://github.com/typicode/husky)
* [`lint-staged`](https://github.com/okonet/lint-staged)

[Back to top](#top)

## Testing

We aim for 100% test coverage. This should be achieveable given the nature of the packages.

When it comes to component testing, we want to fully test the way props are consumed. `propType` checks, coverage and linting tools can't guarantee props are being applied correctly. This can lead to passing tests, good coverage stats, but broken UIs in production.

[Back to top](#top)

## Dependencies

We use **exact** versions for development dependencies.

If you need to install any `devDependencies` to be used by the repository itself or any of the packages, install them at the **root** level.

Package `dependencies` and `peerDependencies` versions should be more flexible however (most commonly with the caret `^`), to allow NPM more room to deduplicate packages.

[Back to top](#top)
