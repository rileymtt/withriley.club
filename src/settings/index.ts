export const ACCESS_TOKEN_KEY =
  process.env.REACT_APP_ACCESS_TOKEN_KEY || "LouyiO1igij54zszbC7FlwRe0uxZ";
export const DEVICE_KEY = "uU5tEUmAgvBWArsv";
export const SCOPES_KEY = "AhBcmvr1EkMdPnL5";

export let AppConfig: { WS: string; API: string; } = {
  WS: process.env.REACT_APP_WS_URL || "",
  API: process.env.REACT_APP_API_URL || "",
};