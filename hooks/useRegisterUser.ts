import { useMutation } from "react-query";

import { ErrorResponseBody, RegisterApi } from "@/api";
import { SignUpKeys, UserResponse } from "@/types";

const useRegisterUser = (
  onSuccess?: (_: UserResponse) => void,
  onError?: (_: ErrorResponseBody) => void
) => {
  const registerApi = new RegisterApi();

  return useMutation<UserResponse, ErrorResponseBody, { payload: SignUpKeys }>(
    ({ payload }) => registerApi.storeUser(payload).then((data) => data),
    {
      onSuccess,
      onError,
    }
  );
};

export default useRegisterUser;
