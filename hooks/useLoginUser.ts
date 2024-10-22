import { useMutation } from "react-query";

import { ErrorResponseBody, AuthenticatationApi } from "@/api";
import { SignInKeys, SignInResponse } from "@/types";

const useLoginUser = (
  onSuccess?: (_: SignInResponse) => void,
  onError?: (_: ErrorResponseBody) => void
) => {
  const authenticatationApi = new AuthenticatationApi();

  return useMutation<
    SignInResponse,
    ErrorResponseBody,
    { payload: SignInKeys }
  >(({ payload }) => authenticatationApi.login(payload).then((data) => data), {
    onSuccess,
    onError,
  });
};

export default useLoginUser;
