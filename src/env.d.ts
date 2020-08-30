declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    REDIS_URL: string;
  }
}