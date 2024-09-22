import { Request, Response } from "express";
import {hashPassword} from '../services/password.service' 
import prisma from '../models/user';
import { generateToken } from "../services/auth.service";

export const register = async (req: Request, res: Response): Promise<void> => {
    const {usuario, password} = req.body;
    try {
        const hashedPassword = await hashPassword(password)
        console.log(hashPassword)

        const user = await prisma.create(
            {
                data: {
                    usuario,
                    password: hashedPassword
                }
            }
        )

        // Generarmos el token
        const token = generateToken(user)
        res.status(201).json({token});
        
    } catch (error) {
        //Mejorar los errores
        console.log(error);
        res.status(500).json({
            error: 'Hubo un error en el registro'
        })
    }
}