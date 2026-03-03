import type { Request, Response, NextFunction } from "express";
import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const postAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.create(req.body);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id as string, 10);
        const users = await User.findByPk(id);
        if (!users) {
            const err = new Error("aucun user avec cette id");
            (err as any).status = 404;
            throw err;
        }
        await users.destroy();
        res.status(200).json({message: `l'user ${req.params.id} a été supprimer`});
    } catch (error) {
        next(error);
    }
};
