import axios, { type AxiosError, AxiosInstance } from "axios";
import { HttpErrorCode, HttpStatusCode } from "@/types";
import {
  BadRequestResult,
  ForbiddenErrorResult,
  HttpErrorResult,
  InternalServerErrorResult,
  ServiceUnavailableErrorResult,
  UnprocessableEntityResult,
} from "./NetworkErrors";

export const responseHandler = async (
  error: AxiosError,
  axiosInstance: AxiosInstance,
  previousRequest?: string
) => {
  if (axios.isCancel(error as any)) {
    return;
  }

  const statusCode = error.response?.status;
  const data = error.response?.data as any;

  // Bypassing checks if the call is for login, since status codes are already handled in AuthenticationContext, inside the signIn method
  if (
    statusCode
    // && previousRequest !== Constants?.expoConfig?.extra?.loginUrl
  ) {
    // if (statusCode === HttpStatusCode.UN_AUTHORIZED) {
    //   const auth = new Auth();
    //   const originalRequest: AxiosRequestConfig = error.config as any;

    //   if (!isRefreshing) {
    //     isRefreshing = true;

    //     // eslint-disable-next-line promise/no-promise-in-callback
    //     return await auth
    //       .refreshToken()
    //       .then(({ data: responseData }) => {
    //         return onRefreshTokenSuccess(
    //           originalRequest,
    //           axiosInstance,
    //           responseData.access_token,
    //           responseData.refresh_token,
    //           responseData.id_token,
    //         );
    //       })
    //       .catch(({ error_description }) => {
    //         clearQueue();

    //         return forceLogoutHandler(error_description);
    //       })
    //       .finally(() => {
    //         isRefreshing = false;
    //       });
    //   }

    //   // Add the original request to the queue
    //   return new Promise<void>((resolve, reject) => {
    //     refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
    //   });
    // }

    if (statusCode === HttpStatusCode.FORBIDDEN)
      throw new ForbiddenErrorResult(
        HttpErrorCode.ForbiddenError,
        JSON.stringify(data.errors ?? { error: [data.message] })
      );

    if (statusCode === HttpStatusCode.BAD_REQUEST)
      throw new BadRequestResult(HttpErrorCode.BadRequestError, data);

    if (statusCode === HttpStatusCode.SERVICE_UNAVAILABLE) {
      throw new ServiceUnavailableErrorResult(
        HttpErrorCode.ServiceUnavailableError,
        JSON.stringify(data.errors ?? { error: [data.message] })
      );
    }

    if (statusCode === HttpStatusCode.INTERNAL_SERVER_ERROR)
      throw new InternalServerErrorResult(
        HttpErrorCode.InternalServerError,
        JSON.stringify(data.errors ?? { error: [data.message] })
      );

    if (statusCode === HttpStatusCode.UNPROCESSIBLE_ENTITY) {
      const errorData = data.errors ?? { error: [data.message] };
      throw new UnprocessableEntityResult(
        HttpErrorCode.UnprocessableEntity,
        JSON.stringify(errorData)
      );
    }

    throw new HttpErrorResult(
      HttpErrorCode.HttpError,
      JSON.stringify(data.errors ?? { error: [data.message] })
    );
  }

  return error.response;
};
