import type { Request, Response } from "express";
import User from "../models/User";

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as any).message });
    }
};

export const postAllUsers = async (req : Request, res : Response) => {
    const users = await User.create(req.body);
    res.status(200).json(users)
};

export const deleteUser = async (req : Request, res : Response) => {
    const users = await User.findByPk(req.params.id);
    if (!users) return res.status(404).json({error : "aucun user avec cette id"});
    await users.destroy();
    res.status(200).json({message: `l'user ${req.params.id} a été supprimer`});
};
