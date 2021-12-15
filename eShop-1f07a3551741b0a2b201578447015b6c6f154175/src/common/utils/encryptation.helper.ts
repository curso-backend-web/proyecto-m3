import * as bcrypt from "bcrypt"

export class Encryptation {
  static async encryptPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }

  static async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }
}