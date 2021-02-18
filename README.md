![src-spandx logo](/doc/logo.png)
# crc-spandx

[![npm version](https://badge.fury.io/js/crc-spandx.svg)](https://badge.fury.io/js/crc-spandx)

- [crc-spandx](#crc-spandx)
- [Install](#install)
- [Run](#run)
  - [Options](#options)
    - [--config -c](#--config--c)
    - [--environment -e](#--environment--e)
- [Known issues](#known-issues)
  - [No custom chrome support](#no-custom-chrome-support)

This package is based on [insights-proxy](https://github.com/RedHatInsights/insights-proxy) and [Red Hat Spandx](https://github.com/redhataccess/spandx).

It is being used to run cloud.redhat.com application without running a docker container. It prevents issues of using MacOS Docker.

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

### --environment -e

Environment you want to proxy. `ci` by default.

# Known issues

## No custom chrome support

Will be implemented when I need it. :smiley:
