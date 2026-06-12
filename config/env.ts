import * as dotenv from "dotenv";
dotenv.config();

export type Env = "qa" | "stage" | "prod";

export function getEnvConfig(env: Env) {
  if (env == "qa") {
    return {
      baseURL: process.env.QA_BASE_URL,
      username: process.env.QA_USERNAME,
      password: process.env.QA_PASSWORD,
    };
  }

  if (env == "stage") {
    return {
      baseURL: process.env.STAGE_BASE_URL,
      username: process.env.STAGE_USERNAME,
      password: process.env.STAGE_PASSWORD,
    };
  }

  return {
    baseURL: process.env.PROD_BASE_URL,
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
  };
}

export const env = getEnvConfig("qa");
// console.log(env);