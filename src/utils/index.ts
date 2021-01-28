import fs from "fs";
import crypto from "crypto";
//read the user data from json file
export const saveUserData = async (data, filename) => {
  const stringifyData = JSON.stringify(data);
  return fs.writeFileSync(filename, stringifyData);
};
//get the user data from json file
export const getUserData = async(filename) => {
  const jsonData = fs.readFileSync(filename);
  return JSON.parse(jsonData.toString());
};

export const findExist = async (user, name) => {
  return user.find((user) => user.name === name);
};

export const hash = async(password) => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
}

export const verify = async(password, hash) => {
  // return console.log(password, hash)
  return new Promise((resolve, reject) => {
     const [salt, key] = hash.split(":");
     crypto.scrypt(password, salt, 64, (err, derivedKey) => {
       if (err) reject(err);
       resolve(key == derivedKey.toString("hex"));
     });
  });
}