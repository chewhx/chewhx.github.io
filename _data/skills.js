function every(array, num) {
  let times = Math.ceil(array.length / num);
  let start = 0; //0
  let end = num; //3
  const res = [];
  let n = 0;
  while (n < times) {
    res.push(array.slice(start, end));
    n++;
    start = end;
    end += num;
  }
  return res;
}

const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "MongoDB + Mongoose",
  "NodeJS + ExpressJS",
  "React + Redux",
  "Google Cloud",
  "Finance & Budgeting",
  "Event Management",
];

module.exports = function () {
  return every(skills, 6);
};
