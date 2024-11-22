import { Request, Response } from "express";
import prisma from '../../../../models/privilegios/formulario/tiposRespuesta/respuestaTexto'
// Crear ResOU
// Crear RespuestaTexto
export const createRespuestaTexto = async (req: Request, res: Response): Promise<void> => {
    const { resTxt,idp,idres,  } = req.body;
    try {
        const respuestaTexto = await prisma.create({
            data: { resTxt:resTxt,idres:idres,idp:idp },
        });
        res.status(201).json({ respuestaTexto });
    } catch (error: any) {
        res.status(500).json({ error: "Error al crear la respuesta texto", details: error.message });
    }
};

// Obtener todas las RespuestaTexto
export const getAllRespuestaTexto = async (_req: Request, res: Response): Promise<void> => {
    try {
        const respuestaTextoList = await prisma.findMany();
        res.status(200).json(respuestaTextoList);
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener las respuestas texto", details: error.message });
    }
};

// Actualizar RespuestaTexto
export const updateRespuestaTexto = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { texto } = req.body;
    try {
        const respuestaTexto = await prisma.update({
            where: { idrestxt: parseInt(id, 10) },
            data: { resTxt:texto },
        });
        res.status(200).json({ respuestaTexto });
    } catch (error: any) {
        res.status(500).json({ error: "Error al actualizar la respuesta texto", details: error.message });
    }
};

// Eliminar RespuestaTexto
export const deleteRespuestaTexto = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.delete({
            where: { idrestxt: parseInt(id, 10) },
        });
        res.status(200).json({ message: "Respuesta texto eliminada correctamente" });
    } catch (error: any) {
        res.status(500).json({ error: "Error al eliminar la respuesta texto", details: error.message });
    }
};
