import { AxiosInstance } from "axios";

import { api } from "./http/NetworkClient";
import { SignInKeys, User, SignUpResponse, SignInResponse } from "@/types";
import ResponseBuilder, { serializeError } from "./http/ResponseBuilder";
import { SignUpKeys } from "@/types";

class Authenticatation {
  private api: AxiosInstance;

  constructor() {
    this.api = api();
  }

  async regsiter(payload: SignUpKeys): Promise<SignUpResponse> {
    try {
      const {
        data: { data: user, message },
      } = await this.api.post<SignUpResponse>(`/users/signup/`, payload);

      return ResponseBuilder.ok<User>(user, message);
    } catch (error: unknown) {
      throw serializeError(error);
    }
  }

  async login(payload: SignInKeys): Promise<SignInResponse> {
    try {
      const {
        data: { data: user, message },
      } = await this.api.post<SignInResponse>(`/users/login/`, payload);

      return ResponseBuilder.ok<User>(user, message);
    } catch (error: unknown) {
      throw serializeError(error);
    }
  }
}

export default Authenticatation;
