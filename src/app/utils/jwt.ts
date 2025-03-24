import jwt from "jsonwebtoken";
import config from "../config";

export class JwtService {
  private access_secret: string;
  private access_expires_in: string;

  constructor() {
    this.access_secret = config.JWT_ACCESS_SECRET;
    this.access_expires_in = config.JWT_ACCESS_EXPIRES_IN;
  }

  signAccessToken(payload: object) {
    return jwt.sign(payload, this.access_secret, {
      expiresIn: this.access_expires_in as "5d",
    });
  }

  verifyAccessToken(token: string) {
    return jwt.verify(token, this.access_secret);
  }
}
