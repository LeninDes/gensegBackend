import { Request, Response } from "express";
//import prisma from '../../../../models/privilegios/formulario/tiposRespuesta/respuestaOpcionMultiple'
import prisma from '../../../models/privilegios/formulario/tiposRespuesta/respuestaOpcionMultiple'
// Crear ResOM
export const createResOM = async (req: Request, res: Response): Promise<void> => {
    const { idres, idp, idomul } = req.body;
    try {
        const resOM = await prisma.create({
            data: { idres:idres, idp:idp, idomul:idomul },
        });
        res.status(201).json({ resOM });
    } catch (error: any) {
        res.status(500).json({ error: "Error al crear la respuesta múltiple", details: error.message });
    }
};

// Obtener todas las ResOM
export const getAllResOM = async (_req: Request, res: Response): Promise<void> => {
    try {
        const resOMList = await prisma.findMany();
        res.status(200).json(resOMList);
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener las respuestas múltiples", details: error.message });
    }
};

// Actualizar ResOM
export const updateResOM = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { idomul } = req.body;
    try {
        const resOM = await prisma.update({
            where: { idresom: parseInt(id, 10) },
            data: { idomul:idomul },
        });
        res.status(200).json({ resOM });
    } catch (error: any) {
        res.status(500).json({ error: "Error al actualizar la respuesta múltiple", details: error.message });
    }
};

// Eliminar ResOM
export const deleteResOM = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.delete({
            where: { idresom: parseInt(id, 10) },
        });
        res.status(200).json({ message: "Respuesta múltiple eliminada correctamente" });
    } catch (error: any) {
        res.status(500).json({ error: "Error al eliminar la respuesta múltiple", details: error.message });
    }
};
