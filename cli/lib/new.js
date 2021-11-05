const fs = require("fs");
const { __postdir } = require("./paths");

const newEntry = (args) => {
  const entryName = Date.now() + ".md";
  const filePath = `${__postdir}/${entryName}`;
  const frontMatter = {
    layout: args.l.toString() || "post",
    title: args.Ti || "",
    date: new Date(args.d).toISOString() || new Date().toISOString(),
    tags: args.Tg.toString() || "post",
  };

  if (typeof args.c === "string") {
    frontMatter.categories = args.c.toString();
  }
  if (typeof args.p === "string") {
    frontMatter.permalink = args.p.toString();
  }

  const journalTemplate = `---
${Object.entries(frontMatter)
  .map(([key, values]) => key + ": " + values)
  .join("\n")}
---\n\n`;

  fs.writeFileSync(filePath, journalTemplate, { encoding: "utf-8" });
  console.log(`New journal entry created ${entryName}`);
};

module.exports = newEntry;
