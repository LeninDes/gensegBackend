import { Request, Response } from "express";
import prisma from '../../../models/privilegios/formulario/preguntas'

export const createPrg = async (req: Request, res: Response): Promise<void> => {
    const { nmPrg, idf } = req.body;
    try {
        const prg = await prisma.create({
            data: { nmPrg, idf },
        });
        res.status(201).json({ prg });
    } catch (error: any) {
        res.status(500).json({ error: "Error al crear el programa", details: error.message });
    }
};

export const getAllPrgs = async (_req: Request, res: Response): Promise<void> => {
    try {
        const prgs = await prisma.findMany();
        res.status(200).json(prgs);
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener los programas", details: error.message });
    }
};

export const updatePrg = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nmPrg } = req.body;
    try {
        const prg = await prisma.update({
            where: { idp: parseInt(id, 10) },
            data: { nmPrg },
        });
        res.status(200).json({ prg });
    } catch (error: any) {
        res.status(500).json({ error: "Error al actualizar el programa", details: error.message });
    }
};

export const deletePrg = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.delete({
            where: { idp: parseInt(id, 10) },
        });
        res.status(200).json({ message: "Programa eliminado" });
    } catch (error: any) {
        res.status(500).json({ error: "Error al eliminar el programa", details: error.message });
    }
};
