#!/usr/bin/env node
const { program } = require("commander");
const pkg = require("../package.json");



program
  .version(pkg.version)
  .command("new", "Create a new journal entry")
  .command("pop", "Remove latest journal entry");

program.parse(process.argv);
