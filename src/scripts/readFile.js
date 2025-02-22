import { readFile as fsReadLine } from "fs";

const readFile = (filename) =>
  new Promise(async (resolve, reject) => {
    try {
      fsReadLine(filename, "utf8", (err, data) => {
        if (err) {
          reject({ success: false, error: err });
          return console.error(err);
        }
        resolve({ success: true, data });
      });
    } catch (error) {
      console.error(error);
      reject({ success: false, error });
    }
  });

export default readFile;
