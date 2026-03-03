import type { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const status = (err && err.status) ? err.status : 500;
  const message = (err && err.message) ? err.message : "Erreur interne du serveur";

  res.status(status).json({
    error: message
  });
};