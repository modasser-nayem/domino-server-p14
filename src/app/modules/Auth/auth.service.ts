import { bindAllMethods } from "../../utils/bindmethod";
import { JwtService } from "../../utils/jwt";

import { TLoginUser, TRegisterUser } from "./auth.interface";

export class AuthService {
  private readonly jwtService: JwtService;

  constructor() {
    this.jwtService = new JwtService();
    bindAllMethods(this);
  }

  async register(payload: { data: TRegisterUser }) {
    return {
      name: payload.data.name,
      email: payload.data.email,
      password: payload.data.password,
    };
  }

  async login(payload: { data: TLoginUser }) {
    const access_token = this.jwtService.signAccessToken({
      id: "0001",
      role: "admin",
      email: payload.data.email,
    });

    return { access_token };
  }
}
