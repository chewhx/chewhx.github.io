const { program } = require("commander");
const pop = require("../lib/pop");

program.action(pop).parse(process.argv);
