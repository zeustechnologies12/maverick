import { useMutation } from "react-query";

import { ErrorResponseBody, RegisterApi } from "@/api";
import { User } from "@/types";

const useRegisterUser = (onSuccess?: () => void, onError?: () => void) => {
  const registerApi = new RegisterApi();

  return useMutation<User, ErrorResponseBody, { payload: User }>(
    ({ payload }) => registerApi.storeUser(payload).then(({ data }) => data),
    {
      onSuccess,
      onError,
    }
  );
};

export default useRegisterUser;
