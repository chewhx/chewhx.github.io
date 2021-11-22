const { program } = require("commander");
const list = require("../lib/list")

program
  .action(list)
  .parse(process.argv);
