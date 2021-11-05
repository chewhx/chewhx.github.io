const fs = require("fs");
const { __postdir } = require("./paths");

module.exports = () => {
  try {
    let listOfEntries = fs.readdirSync(__postdir);
    listOfEntries = listOfEntries.filter((e) => e.match(/([0-9])+.md/g)).sort();
    if (!listOfEntries.length) {
      throw Error("No journal entries found.");
    }
    const entryToDelete = listOfEntries.pop();
    fs.unlinkSync(`${__postdir}/${entryToDelete}`);
    console.log(`Last journal entry deleted ${entryToDelete}`);
  } catch (e) {
    console.error(e.message);
  }
};
