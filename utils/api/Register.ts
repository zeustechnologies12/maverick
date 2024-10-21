import { AxiosInstance } from "axios";

import { api } from "./http/NetworkClient";
import { User, UserResponse } from "@/types";
import ResponseBuilder, { serializeError } from "./http/ResponseBuilder";
import { SignUpKeys } from "@/types";

class Register {
  private api: AxiosInstance;

  constructor() {
    this.api = api();
  }

  async storeUser(payload: SignUpKeys): Promise<UserResponse> {
    try {
      const {
        data: { data: user, message },
      } = await this.api.post<UserResponse>(`/users/signup/`, payload);

      return ResponseBuilder.ok<User>(user, message);
    } catch (error: unknown) {
      throw serializeError(error);
    }
  }
}

export default Register;
