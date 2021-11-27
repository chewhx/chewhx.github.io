const inquirer = require("inquirer");
const { __postdir } = require("./paths");
const fs = require("fs-extra");
const getEntries = require("../utils/getEntries");
const getPostTitle = require("../utils/getPostTitle");
const open = require("open");
const { format } = require("date-fns");

module.exports = () => {
  // Get a list of posts in post dir
  let listOfPosts = getEntries();
  // listOfPosts = listOfPosts.map(({ entry, birthtime }) =>
  //   birthtime.toLocaleString("en-SG", {
  //     year: "numeric",
  //     month: "short",
  //     day: "2-digit",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     second: "2-digit",
  //   })
  // );

  listOfPosts = listOfPosts.map(({ entry, birthtime }) => {
    const postPath = __postdir + "/" + entry;
    const stringDate = format(birthtime, "do MMM yyyy HH:mm");
    return {
      name: `${stringDate} - ${getPostTitle(postPath)}`,
      value: postPath,
    };
  });

  inquirer
    .prompt({
      type: "list",
      name: "chosenEntry",
      message: "Which post would you like to open?",
      choices: [new inquirer.Separator(), ...listOfPosts],
      pageSize: 10,
    })
    .then(async ({ chosenEntry }) => {
      await open(chosenEntry, { app: { name: "Visual Studio Code" } });
      console.log(`Entry opened.`);
    });
};
