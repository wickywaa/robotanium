declare global {
  namespace Express {
    interface Request {
      sessionId: string;
      accessToken: string;
    }
  }
}
