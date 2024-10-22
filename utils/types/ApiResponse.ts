import { User } from "./User";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  status: number;
}

export type SignUpResponse = ApiResponse<User>;
export type SignInResponse = ApiResponse<User>;
