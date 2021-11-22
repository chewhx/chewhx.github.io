const fs = require("fs-extra");

module.exports = (filePath) => {
  const contents = fs.readFileSync(filePath);

  const postTitle = contents
    .toString()
    .match(/(?<=title:).*/g)[0]
    .trim();

  return postTitle;
};
