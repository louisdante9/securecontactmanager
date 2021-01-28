import FileSystem from "fs";
import crypto from "crypto";
import { getCipherKey } from "./util";

export class Safe {
  filePath: string;
  password: string;
  constructor(filePath, password) {
    this.filePath = filePath;
    this.password = password;
  }
  encryptAsync(data = "[]") {
    // return new Promise((resolve, reject) => {
    //   // try {
    //   //   var cipher = crypto.createCipher("aes-256-cbc", this.password);
    //   //   var encrypted = Buffer.concat([
    //   //     cipher.update(Buffer.from(JSON.stringify(data), "utf8")),
    //   //     cipher.final(),
    //   //   ]);
    //   // } catch (exception) {
    //   //   reject({ message: exception.message });
    //   // }
    //   FileSystem.writeFile(this.filePath, data, (error) => {
    //     if (error) {
    //       reject(error);
    //     }
    //     resolve({ message: "Encrypted!" });
    //   });
    // });
    return new Promise((resolve, reject) => {
      try {
        const initVect = crypto.randomBytes(16);
    		const CIPHER_KEY = getCipherKey(this.password);
        var cipher = crypto.createCipheriv(
          "aes-256-cbc",
          "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
          initVect
        );
				
        var encrypted = Buffer.concat([
					cipher.update(Buffer.from(JSON.stringify(data), "utf8")),
          cipher.final(),
        ]);
				console.log(encrypted, "hello there");
      } catch (exception) {
        reject({ message: exception.message });
      }
      FileSystem.writeFile(this.filePath, encrypted.toString('hex'), (error) => {
        if (error) {
          reject(error);
        }
        console.log(encrypted.toString());
        resolve({ message: "Encrypted!" });
      });
    });
  }

  decryptAsync(hash) {
    // return new Promise((resolve, reject) => {
    //   FileSystem.readFile(this.filePath, (error, data) => {
    //     if (error) {
    //       reject(error);
    //     }
    //     try {
    //       var decipher = crypto.createDecipher("aes-256-cbc", this.password);
    //       var decrypted = Buffer.concat([
    //         decipher.update(data),
    //         decipher.final(),
    //       ]);
    //       resolve(JSON.parse(decrypted.toString()));
    //     } catch (exception) {
    //       reject({ message: exception.message });
    //     }
    //   });
    // });
    return new Promise((resolve, reject) => {
      FileSystem.readFile(this.filePath, (error, hash:any) => {
        if (error) {
          reject(error);
        }
        try {
          const initVect = crypto.randomBytes(16);
          const CIPHER_KEY = getCipherKey(this.password);
          var decipher = crypto.createDecipheriv(
            "aes-256-cbc",
            "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3",
            Buffer.from(hash.iv, "hex")
          );
          var decrypted = Buffer.concat([
            decipher.update(Buffer.from(hash.content, "hex")),
            decipher.final(),
          ]);
          console.log(decrypted.toString());
          resolve(JSON.parse(decrypted.toString()));
        } catch (exception) {
          reject({ message: exception.message });
        }
      });
    });
  }

  async getAllRecords() {
    return JSON.parse(
      await FileSystem.promises.readFile(this.filePath, {
        encoding: "utf8",
      })
    );
  }
}
