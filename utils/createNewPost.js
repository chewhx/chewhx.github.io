const fs = require("fs");

const args = process.argv.slice(2);
const title = args[0] === "-t" ? args[1] : "";
const filePath = `./posts/${Date.now()}.md`;
const date = new Date().toISOString();
const template = `---\nlayout: post\ntitle: ${title}\ndate: ${date}\ntags: ["post"]\n---\n\n
`;

fs.writeFileSync(filePath, template, { encoding: "utf-8" });
