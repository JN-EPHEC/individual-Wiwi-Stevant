import type { Request, Response, NextFunction } from 'express';

export const checkIdParam = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  // Vérifier que l'ID existe et est un nombre entier valide
  if (!id || isNaN(Number(id)) || !Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(400).json({
      error: "L'ID doit être un nombre entier positif valide"
    });
  }

  next();
};
