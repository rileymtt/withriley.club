import CryptoJS from "crypto-js";
import { ACCESS_TOKEN_KEY, SCOPES_KEY } from "settings";

export const isLoggedIn = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) != null;
};

export const logoutReturnTo = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(SCOPES_KEY);
  localStorage.removeItem("wallet");
  window.location.reload();
};

export const logout = () => {
  localStorage.removeItem("wallet");
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(SCOPES_KEY);
  // window.location.reload();
};

export const setAccessToken = (accessToken: string) => {
  localStorage.setItem(
    ACCESS_TOKEN_KEY,
    Encrypt(accessToken, ACCESS_TOKEN_KEY)
  );
};

export const getAccessToken = () => {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwid2FsbGV0QWRkcmVzcyI6bnVsbCwiZW1haWwiOiJyZWFsYmV3aHlAZ21haWwuY29tIiwiaWF0IjoxNzIzMTc3NTY5LCJleHAiOjE3MjM3ODIzNjl9.Py980fETZDb3LGGnUJgtzuQkFnpS8eLCxIkMwmHkbPs";
  // if (typeof window !== "undefined") {
  //   const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  //   if (!accessToken) return null;
  //   return Decrypt(accessToken, ACCESS_TOKEN_KEY);
  // }
  // return null;
  // return window.localStorage.getItem("MEGA_ACCESS_TOKEN");
};

export const setScopes = (scopes: any) => {
  localStorage.setItem(SCOPES_KEY, Encrypt(JSON.stringify(scopes), SCOPES_KEY));
};

export const checkScope = (scope: string) => {
  const scopesData = localStorage.getItem(SCOPES_KEY);
  if (!scopesData) return null;
  var scopes = JSON.parse(Decrypt(scopesData, SCOPES_KEY));
  return scopes.indexOf(scope) >= 0;
};

export const Encrypt = (message: any, privateKey: any) =>
  CryptoJS.AES.encrypt(message, privateKey).toString();

export const Decrypt = (ciphertext: any, privateKey: any) => {
  var bytes = CryptoJS.AES.decrypt(ciphertext, privateKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
