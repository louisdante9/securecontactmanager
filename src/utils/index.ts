import fs from "fs";
import crypto from "crypto";
import { encrypt, decrypt } from "../encryption";
//read the user data from json file
export const saveUserData = async (data, filename) => {
  const stringifyData = JSON.stringify(data);
  return fs.writeFileSync(filename, stringifyData);
};
//get the user data from json file
export const getUserData = async (filename) => {
  const jsonData = fs.readFileSync(filename);
  return JSON.parse(jsonData.toString());
};

export const findExist = async (user, name) => {
  return user.find((user) => user.name === name);
};

export const hash = async (password) => {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ":" + derivedKey.toString("hex"));
    });
  });
}

export const verify = async (password, hash) => {
  // return console.log(password, hash)
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(key == derivedKey.toString("hex"));
    });
  });
}
type objectMap = { [key: string]: any };

export const cipher = async (filename, contact: Array<objectMap>) => {
  const data = Buffer.from(JSON.stringify(contact, null, 2));
  const encrypted = encrypt(data);
  const encrypteddata = fs.writeFileSync(filename, encrypted);
  return encrypteddata;
};

export const decipher = async (filename) => {
  var encrypted = fs.readFileSync(filename);
  const decrypted:any = decrypt(encrypted);
  return JSON.parse(decrypted);
};
