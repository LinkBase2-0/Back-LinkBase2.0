import * as dotenv from "dotenv";

dotenv.config();

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string
      SECRET?: string;
      DB_NAME?: string | undefined
      DB_PASSWORD?: string;
      DB_USERNAME?: string;
    }
  }
}

const requiredEnvs = [
  "SECRET",
  "PORT",
  "DB_NAME",
  "DB_USERNAME",
  "DB_PASSWORD",
];

requiredEnvs.forEach((env) => {
  if (!process.env[env]) console.error(`Missing env variable ${env}`);
});

export const secret = process.env.SECRET;
export const port = process.env.PORT;
export const db_Name = process.env.DB_NAME;
export const db_Username = process.env.DB_USERNAME;
export const db_Password = process.env.DB_PASSWORD;
