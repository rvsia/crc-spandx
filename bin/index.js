#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const argv = require("yargs").argv;

const spandx = require("spandx");

async function handleCli() {
    if (argv.v || argv.version) {
        // spandx -v --version
        const package = require("../package.json");
        console.log(package.version);
    } else {
        // spandx
        const defaultConfig = require("../src/spandx.config.js");

        let confFile;
        try {
            const confArg = argv.c || argv.config || "spandx.config.js";
            confFile = path.resolve(process.cwd(), confArg);
            const customConfig = require(confFile);

            defaultConfig.routes = {...defaultConfig.routes, ...customConfig.routes};
            defaultConfig.esi = {...defaultConfig.esi, ...customConfig.esi};
        } catch (e) {
            console.warn('No config provided')
        };

        console.log(defaultConfig);

        await spandx.init(defaultConfig);
    }
}

handleCli();
