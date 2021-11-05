const { program } = require("commander");
const newEntry = require("../lib/new");
program
  .option("-ti [title]", "Title of journal entry")
  .option(
    "-p [permalink]",
    "Change the output target of the current template. Normally, you cannot use template syntax to reference other variables in your data, but permalink is an exception."
  )
  .option(
    "-l [layout]",
    "Wrap current template with a layout template found in the _includes folder.",
    "post"
  )
  .option(
    "-tg [tags]",
    "A single string or array that identifies that a piece of content is part of a collection. Collections can be reused in any other template.",
    "post"
  )
  .option(
    "-d [date]",
    "Override the default date (file creation) to customize how the file is sorted in a collection.",
    new Date().toISOString()
  )
  .option("-c [categories]", "Labels of topic for the collection.")
  .action(newEntry)
  .parse(process.argv);
