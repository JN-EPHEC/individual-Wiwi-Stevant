import { Router } from "express";
import type { Request, Response } from "express";
import User from '../models/User.js';
import * as userController from "../controllers/userController.js";
import { checkIdParam } from "../middlewares/checkIdParam.js";

const router = Router();
/**
 * @swagger
 * /api/users :
 *  get:
 *      summary: récupere la liqte des utilisateur
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Succès
 */
router.get("/", userController.getAllUsers);

/**
 * @swagger
 * /api/users :
 *  post:
 *      summary: crée un nouvel utilisateur
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Utilisateur créé avec succès
 */
router.post("/", userController.postAllUsers);

/**
 * @swagger
 * /api/users/{id} :
 *  delete:
 *      summary: supprime un utilisateur par son ID
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *                type: integer
 *            description: ID de l'utilisateur à supprimer
 *      responses:
 *          200:
 *              description: Utilisateur supprimé avec succès
 *          404:
 *              description: Utilisateur non trouvé
 */
router.delete("/:id", checkIdParam, userController.deleteUser);

export default router;