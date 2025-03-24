import bcrypt from "bcrypt";
import config from "../config";

export class PasswordHelper {
  public static async hashPassword(plainTextPassword: string): Promise<string> {
    return await bcrypt.hash(plainTextPassword, config.BCRYPT_SALT_ROUNDS);
  }

  public static async comparePassword(
    plainTextPassword: string,
    hashPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(plainTextPassword, hashPassword);
  }
}
