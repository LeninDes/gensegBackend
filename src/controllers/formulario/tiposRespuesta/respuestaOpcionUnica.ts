import { Request, Response } from "express";
//import prisma from '../../../../models/privilegios/formulario/tiposRespuesta/respuestaOpcionUnica'
import prisma from '../../../models/privilegios/formulario/tiposRespuesta/respuestaOpcionUnica'
// Crear ResOM

export const createResOU = async (req: Request, res: Response): Promise<void> => {
    const { idres, idp, idou } = req.body;
    try {
        const resOU = await prisma.create({
            data: { idres:idres, idp:idp, idou:idou },
        });
        res.status(201).json({ resOU });
    } catch (error: any) {
        res.status(500).json({ error: "Error al crear la respuesta única", details: error.message });
    }
};

// Obtener todas las ResOU
export const getAllResOU = async (_req: Request, res: Response): Promise<void> => {
    try {
        const resOUList = await prisma.findMany();
        res.status(200).json(resOUList);
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener las respuestas únicas", details: error.message });
    }
};

// Actualizar ResOU
export const updateResOU = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { idou } = req.body;
    try {
        const resOU = await prisma.update({
            where: { idresou: parseInt(id, 10) },
            data: { idou:idou },
        });
        res.status(200).json({ resOU });
    } catch (error: any) {
        res.status(500).json({ error: "Error al actualizar la respuesta única", details: error.message });
    }
};

// Eliminar ResOU
export const deleteResOU = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.delete({
            where: { idresou: parseInt(id, 10) },
        });
        res.status(200).json({ message: "Respuesta única eliminada correctamente" });
    } catch (error: any) {
        res.status(500).json({ error: "Error al eliminar la respuesta única", details: error.message });
    }
};
