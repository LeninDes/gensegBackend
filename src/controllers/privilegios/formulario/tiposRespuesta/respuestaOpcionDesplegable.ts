import { Request, Response } from "express";
import prisma from '../../../../models/privilegios/formulario/tiposRespuesta/respuestaOpcionDesplegable'
// Crear ResOM
export const createResOD = async (req: Request, res: Response): Promise<void> => {
    const { idres, idp, idodes } = req.body;
    try {
        const resOD = await prisma.create({
            data: { idres:idres, idp:idp, idodes:idodes },
        });
        res.status(201).json({ resOD });
    } catch (error: any) {
        res.status(500).json({ error: "Error al crear la respuesta desordenada", details: error.message });
    }
};

// Obtener todas las ResOD
export const getAllResOD = async (_req: Request, res: Response): Promise<void> => {
    try {
        const resODList = await prisma.findMany();
        res.status(200).json(resODList);
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener las respuestas desordenadas", details: error.message });
    }
};

// Actualizar ResOD
export const updateResOD = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { idodes } = req.body;
    try {
        const resOD = await prisma.update({
            where: { idresod: parseInt(id, 10) },
            data: { idodes },
        });
        res.status(200).json({ resOD });
    } catch (error: any) {
        res.status(500).json({ error: "Error al actualizar la respuesta desordenada", details: error.message });
    }
};

// Eliminar ResOD
export const deleteResOD = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.delete({
            where: { idresod: parseInt(id, 10) },
        });
        res.status(200).json({ message: "Respuesta desordenada eliminada correctamente" });
    } catch (error: any) {
        res.status(500).json({ error: "Error al eliminar la respuesta desordenada", details: error.message });
    }
};
