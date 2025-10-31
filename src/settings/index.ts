export const ACCESS_TOKEN_KEY =
  process.env.REACT_APP_ACCESS_TOKEN_KEY || "LouyiO1igij54zszbC7FlwRe0uxZ";
export const DEVICE_KEY = "uU5tEUmAgvBWArsv";
export const SCOPES_KEY = "AhBcmvr1EkMdPnL5";

export let AppConfig: { WS: string; API: string; ADMIN_API: string, HOMEPAGE_URL: string, HOMEPAGE_LOGIN_PAGE_URL: string } = {
  WS: process.env.REACT_APP_WS_URL || "",
  API: process.env.REACT_APP_API_URL || "",
  ADMIN_API: process.env.REACT_APP_ADMIN_API_URL || "",
  HOMEPAGE_URL: process.env.REACT_APP_HOMEPAGE_URL || "",
  HOMEPAGE_LOGIN_PAGE_URL: (process.env.REACT_APP_HOMEPAGE_URL || "") + "/auth/oauth",
};

console.log(AppConfig);
