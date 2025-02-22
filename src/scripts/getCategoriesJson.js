/* eslint-disable @typescript-eslint/no-require-imports */
const { default: axios } = require("axios");
const { saveFile } = require("./saveFile");

require("dotenv").config();
const api = process.env.NEXT_PUBLIC_API;

const getCategoriesJson = async () => {
  try {
    const { data } = await axios.get(`${api}/v1/category?only_categories=true`);
    if (data?.error) throw new Error(data.error);
    const { saved, error } = await saveFile(
      __dirname + "/../data/categories.json",
      data.data.categories
    );
    if (saved) {
      console.log("Categories Written successfully");
      return { success: true };
    } else throw new Error(error);
  } catch (error) {
    console.error("Error writing categories: ", error.error);
    return { success: false, error };
  }
};

module.exports = { getCategoriesJson };
