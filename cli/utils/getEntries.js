const fs = require("fs-extra");
const { __postdir } = require("../lib/paths");

module.exports = () => {
  let listOfEntries = fs.readdirSync(__postdir);

  const results = [];

  listOfEntries = listOfEntries
    .filter((e) => e.match(/([0-9])+.md/g))
    .sort((a, b) => -1);

  listOfEntries.forEach((e) => {
    const item = {};
    const { birthtime } = fs.statSync(`${__postdir}/${e}`);
    item.entry = e;
    item.birthtime = birthtime;
    results.push(item);
  });

  return results;
};
