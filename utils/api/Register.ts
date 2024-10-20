import { AxiosInstance } from "axios";

import { api } from "./http/NetworkClient";
import { ApiResponse, User } from "@/types";
import ResponseBuilder, { serializeError } from "./http/ResponseBuilder";

type UserResponseBody = ApiResponse<User>;

class Register {
  private api: AxiosInstance;

  constructor() {
    this.api = api();
  }

  async storeUser(payload: User): Promise<any> {
    try {
      const { data } = await this.api.post<UserResponseBody>(
        `/users/signup/`,
        payload
      );

      return ResponseBuilder.ok(data);
    } catch (error: unknown) {
      throw serializeError(error);
    }
  }
}

export default Register;
