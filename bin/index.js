#!/usr/bin/env node

const path = require("path");
const argv = require("yargs").argv;
const spandx = require("spandx-crc");

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
            console.warn('\nNo config provided\n')
        };

        if(typeof argv.localChrome === 'boolean') {
            if(process.env.INSIGHTS_CHROME) {
                console.log('\nlocalChrome was not provided, used env variable INSIGHTS_CHROME\n')
                defaultConfig.routes['/apps/chrome/']      = process.env.INSIGHTS_CHROME;
                defaultConfig.routes['/beta/apps/chrome/'] = process.env.INSIGHTS_CHROME;
            } else {
                console.warn('\nlocalChrome has to be a string or define env variable INSIGHTS_CHROME\n')
            }
        }

        if(typeof argv.localChrome === 'string') {
            defaultConfig.routes['/apps/chrome/']      = argv.localChrome;
            defaultConfig.routes['/beta/apps/chrome/'] = argv.localChrome;
        }

        console.log(defaultConfig);

        await spandx.init(defaultConfig);
    }
}

handleCli();
