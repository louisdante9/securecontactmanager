import crypto  from "crypto";

export function getCipherKey(key:any) {
  return crypto.createHash("sha256").update(key).digest();
}
