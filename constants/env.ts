// Client
export const THEME_KEY = process.env["NEXT_PUBLIC_THEME_KEY"] ?? "theme";

// Server
export const BASE_DOMAIN = process.env["BASE_DOMAIN"] ?? "";
export const MAGIC_TOKEN_SECRET = process.env["MAGIC_TOKEN_SECRET"] ?? "";
export const AUTH_TOKEN_SECRET = process.env["AUTH_TOKEN_SECRET"] ?? "";
export const MAILING_DOMAIN = process.env["MAILING_DOMAIN"] ?? "";
export const RESEND_API_KEY = process.env["RESEND_API_KEY"] ?? "";
export const AUTH_COOKIE_NAME = process.env["AUTH_COOKIE_NAME"] ?? "";
export const ENV = process.env["ENV"] ?? "";

export const S3_ACCESS_KEY = process.env["S3_ACCESS_KEY"] ?? "";
export const S3_SECRET_KEY = process.env["S3_SECRET_KEY"] ?? "";
export const S3_BUCKET_NAME = process.env["S3_BUCKET_NAME"] ?? "";
export const S3_REGION = process.env["S3_REGION"] ?? "";
export const S3_ENDPOINT = process.env["S3_ENDPOINT"] ?? "";
export const S3_CDN_ENDPOINT = process.env["S3_CDN_ENDPOINT"] ?? "";
export const OPEN_AI_KEY = process.env["OPEN_AI_KEY"] ?? "";
