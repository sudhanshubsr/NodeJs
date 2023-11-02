import fs from "fs";
import path from "path";
import rfs from "rotating-file-stream";

const logDirectory = path.join(path.resolve(), "production_logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d",
  path: logDirectory,
});

const development = {
  name: "development",
  asset_path: "./assets",
  session_cookie_key: "blahsomething",
  db: "codeial_devlopment",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "sudhanshusharma103@gmail.com",
      pass: "wqqhnulflwedqxlh",
    },
  },
  google_clientID:
    "712643125861-nglibo9oln5j1di0a49a0vline287a7g.apps.googleusercontent.com",
  google_client_Secret: "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",
  google_callback_URL: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "codeial",
  morgan: {
    mode: "dev",
    options: { stream: accessLogStream },
  },
};

export const production = {
  name: "production",
  asset_path: "./assets",
  session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
  db: process.env.CODEIAL_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.CODEIAL_GMAIL_USERNAME,
      pass: process.env.CODEIAL_GMAIL_PASSWORD,
    },
  },
  google_clientID: process.env.CODEIAL_GOOGLE_CLIENT_ID,
  google_client_Secret: process.env.CODEIAL_GOOGLE_CLEINT_SECRET,
  google_callback_URL: process.env.CODEIAL_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.CODEIAL_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

export default eval(process.env.NODE_ENVIRONMENT) == undefined
  ? development
  : eval(process.env.NODE_ENVIRONMENT);
