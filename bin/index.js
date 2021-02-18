#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const argv = require("yargs").argv;

const spandx = require("spandx");

async function handleCli() {
    const environment = argv.e || argv.environment || 'ci';

    console.log(`Environment: ${environment}`);

    if (argv.v || argv.version) {
        // spandx -v --version
        const package = require("../package.json");
        console.log(package.version);
    } else {
        // spandx
        const defaultConfig = require("../src/spandx.config.js");

        console.log(defaultConfig);

        defaultConfig.routes['/'] = { host: `https://${environment}.cloud.redhat.com/` };

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

        await spandx.init(defaultConfig);
    }
}

handleCli();
