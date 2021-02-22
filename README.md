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
- [Changelog](#changelog)
- [Known issues](#known-issues)
  - [No custom chrome support](#no-custom-chrome-support)

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

# Changelog

0.0.3
- environment option removed, qa/ci/prod is now handled automatically, stage does not work

# Known issues

## No custom chrome support

Will be implemented when I need it. :smiley:
