<p align="center">
  <img src="/doc/logo.png" />
</p>

# crc-spandx

[![npm version](https://badge.fury.io/js/crc-spandx.svg)](https://badge.fury.io/js/crc-spandx)

- [crc-spandx](#crc-spandx)
- [Install](#install)
- [Run](#run)
  - [Options](#options)
    - [--config -c](#--config--c)
    - [--localChrome](#--localchrome)
- [Changelog](#changelog)
- [Known issues](#known-issues)
  - [No custom chrome 1.0 support](#no-custom-chrome-10-support)

This package is based on [insights-proxy](https://github.com/RedHatInsights/insights-proxy) and [Red Hat Spandx](https://github.com/redhataccess/spandx).

crc-spandx is being used to run cloud.redhat.com applications without running a docker container. It also prevents issues with using MacOS Docker and Chrome browser (`Error: status (failed) net::ERR_TOO_MANY_RETIRES`)

# Install

```bash
npm install -g crc-spandx
```

You can also install it locally.

# Run

1. Go to your folder with your spandx.config.js file
2. run `crc-spandx`
3. Go to https://ci.foo.redhat.com:1337/ and enjoy hacking!

## Options

### --config -c

Your file. `spandx.config.js` by default.

### --localChrome

**Currently tested only for ci/beta and Chrome 2.0.**

You can provide an absolute path to your `chrome/build` folder.

If you don't provide the path, the application will take a look for `INSIGHTS_CHROME` environment variable, so you don't have to specify the path everytime.

```bash
// .bashrc or .zshrc

export INSIGHTS_CHROME=/Users/MyUserName/insights-chrome/build/
```

# Changelog

0.1.2
- Allows to use local version of Chrome 2.0

0.0.3
- environment option removed, qa/ci/prod is now handled automatically, stage does not work

# Known issues

## No custom chrome 1.0 support

Not tested yet, it should work for ci/beta and chrome 2.0.

## Stage does not work

For stage, it's required to provide a proxy object. Not implemented yet.
