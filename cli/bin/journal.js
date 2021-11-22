#!/usr/bin/env node
const { program } = require("commander");
const pkg = require("../package.json");

program
  .version(pkg.version)
  .command("new", "Create a new journal entry")
  .command("pop", "Remove latest journal entry")
  .command("list", "List entries in posts folder")
  .command("recent", "Open the latest entry in editor");

program.parse(process.argv);
