const open = require("open");
const getEntries = require("../utils/getEntries");
const { __postdir } = require("./paths");

module.exports = async () => {
  const postTitles = getEntries();
  await open(`${__postdir}/${postTitles[0]["entry"]}`, {
    app: { name: "Visual Studio Code" },
  });
};
