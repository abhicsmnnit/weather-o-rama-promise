const yargs = require('yargs');

const argv = yargs
                .options({
                    address: {
                        describe: 'Address to get weather details for',
                        demandOption: true,
                        alias: 'a',
                        string: true
                    }
                })
                .help()
                .argv;

module.exports.address = argv.address;