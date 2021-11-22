const { program } = require("commander");
const recent = require("../lib/recent");

program.action(recent).parse(process.argv);
