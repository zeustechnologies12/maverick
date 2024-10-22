import { useMutation } from "react-query";

import { ErrorResponseBody, AuthenticatationApi } from "@/api";
import { SignUpKeys, SignUpResponse } from "@/types";

const useRegisterUser = (
  onSuccess?: (_: SignUpResponse) => void,
  onError?: (_: ErrorResponseBody) => void
) => {
  const authenticatationApi = new AuthenticatationApi();

  return useMutation<
    SignUpResponse,
    ErrorResponseBody,
    { payload: SignUpKeys }
  >(
    ({ payload }) => authenticatationApi.regsiter(payload).then((data) => data),
    {
      onSuccess,
      onError,
    }
  );
};

export default useRegisterUser;
