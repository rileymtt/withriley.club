import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from "axios";
import { AppConfig } from "settings";
import { getAccessToken } from "./auth";

type TFunction = () => void;
type TUnionFunction = (e: any) => void;

type ErrorFunctionType = TFunction | TUnionFunction;
type SuccessFunctionType = TFunction | TUnionFunction;

export const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

export function get(
  endpoint: string,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  myFetch("GET", endpoint, undefined, successCallback, errorCallback);
}

export function post(
  endpoint: string,
  body: any,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  myFetch("POST", endpoint, body, successCallback, errorCallback);
}

export function put(
  endpoint: string,
  body: any,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  myFetch("PUT", endpoint, body, successCallback, errorCallback);
}

export function _delete(
  endpoint: string,
  body: any,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  myFetch("DELETE", endpoint, body, successCallback, errorCallback);
}

export async function postWithFormData(
  endpoint: string,
  body: any,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  let url = AppConfig.API + endpoint;

  let headers = {
    Authorization: "bearer " + getAccessToken(),
    "Content-Type": "multipart/form-data",
    accept: "application/json",
  };

  const config = { headers };

  let response = null;

  try {
    response = await axios.post(url, body, config);
    _handleSuccess(response, successCallback);
  } catch (error) {
    _handleError(error, errorCallback);
  }
}

export const alertError = (error: any) => {
  alert(error.code + (error.msg ? ": " + error.msg : ""));
};

async function myFetch(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  body: any,
  successCallback: SuccessFunctionType,
  errorCallback: ErrorFunctionType
) {
  let url = AppConfig.API + endpoint;
  body = JSON.stringify(body);
  let headers: RawAxiosRequestHeaders = defaultHeaders;
  headers["Authorization"] = "bearer " + getAccessToken();
  headers["Accept-Language"] = "en-US,en;q=0.5";
  headers["x-auth-key"] = "Abracadabra";

  const config: AxiosRequestConfig = { headers };

  let response = null;

  try {
    switch (method) {
      case "POST":
        response = await axios.post(url, body, config);
        break;
      case "PUT":
        response = await axios.put(url, body, config);
        break;
      case "DELETE":
        response = await axios.delete(url, config);
        break;
      default:
        response = await axios.get(url, config);
        break;
    }
    _handleSuccess(response, successCallback);
  } catch (error) {
    _handleError(error, errorCallback);
  }
}

const _handleSuccess = (
  response: any,
  successCallback: (data: any) => void
) => {
  const { data } = response;
  successCallback(data);
};

const _handleError = (error: any, errorCallback: ErrorFunctionType) => {
  const { code, message, response } = error;
  if (code === "ERR_BAD_REQUEST" || code === "ERR_BAD_RESPONSE") {
    errorCallback(response.data);
  } else if (code === "ERR_NETWORK") {
    errorCallback("");
  } else {
    errorCallback("");
    console.log(message, code);
  }
};
