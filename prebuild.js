/* eslint-disable @typescript-eslint/no-require-imports */
const { getCategoriesJson } = require("./src/scripts/getCategoriesJson");

require("dotenv").config();

const preBuild = async () => {
  const results = await Promise.all([getCategoriesJson()]);
  const errors = results.filter((result) => !result.success);
  if (errors.length) {
    console.log(results);
    process.exit(1);
  } else process.exit(0);
};

preBuild();
