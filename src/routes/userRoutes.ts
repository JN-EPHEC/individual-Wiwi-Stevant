import { Router } from "express";
import type { Request, Response } from "express";
import User from '../models/User.js';

const router = Router();

router.get('/users', async (req : Request, res : Response) => {
    const tUsers = await User.findAll();
    res.json(tUsers);
});

router.post('/users', async (req : Request, res : Response) => {
    const users = await User.create(req.body);
    res.json(users)
});

router.delete('/users/:id', async (req : Request, res : Response) => {
    const users = await User.findByPk(req.params.id);
    if (!users) return res.status(404).json({error : "aucun user avec cette id"});
    await users.destroy();
    res.json({message: `l'user ${req.params.id} a été supprimer`});
});

export default router;