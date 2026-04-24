import type { JwtPayload } from "../auth";

declare global {
  namespace Express {
    interface Request {
      admin?: JwtPayload;
      auth?: JwtPayload;
    }
  }
}

export {};
