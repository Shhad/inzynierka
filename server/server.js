require('babel-core/register');
require('array-includes').shim();

require('regenerator-runtime/runtime');

const program = require('commander');
const Application = require('./Application');
const prefix = require('./logger').prefix;

const DEV = 'dev';

const defaults = {
    env: DEV,
    port: 4010
};
const defaultInt = (val, defaultVal) => parseInt(val, 10) || defaultVal;

program
    .version('1.0')
    .option('-p, --port <n>' `application port (default ${defaults.port})`, defaultInt, defaults.port)
    .parse(process.argv);

const config = require('./config');

config.application.version = '1.0';
config.application.port = program.port;

const application = new Application(config);
application.start(() => {});
module.exports = application;
