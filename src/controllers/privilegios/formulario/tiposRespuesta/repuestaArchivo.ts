import { Request, Response } from "express";
import prisma from '../../../../models/privilegios/formulario/tiposRespuesta/repuestaArchivo'
// Crear RespuestaArchivo
export const createRespuestaArchivo = async (req: Request, res: Response): Promise<void> => {
    const { idres,idp,resFile } = req.body;
    try {
        const respuestaArchivo = await prisma.create({
            data: { idres:idres, resFile:resFile, idp:idp },
        });
        res.status(201).json({ respuestaArchivo });
    } catch (error: any) {
        res.status(500).json({ error: "Error al crear la respuesta archivo", details: error.message });
    }
};

// Obtener todas las RespuestaArchivo
export const getAllRespuestaArchivo = async (_req: Request, res: Response): Promise<void> => {
    try {
        const respuestaArchivoList = await prisma.findMany();
        res.status(200).json(respuestaArchivoList);
    } catch (error: any) {
        res.status(500).json({ error: "Error al obtener las respuestas archivo", details: error.message });
    }
};

// Actualizar RespuestaArchivo
export const updateRespuestaArchivo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { resFile } = req.body;
    try {
        const respuestaArchivo = await prisma.update({
            where: { idresfile: parseInt(id, 10) },
            data: { resFile:resFile },
        });
        res.status(200).json({ respuestaArchivo });
    } catch (error: any) {
        res.status(500).json({ error: "Error al actualizar la respuesta archivo", details: error.message });
    }
};

// Eliminar RespuestaArchivo
export const deleteRespuestaArchivo = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await prisma.delete({
            where: { idresfile: parseInt(id, 10) },
        });
        res.status(200).json({ message: "Respuesta archivo eliminada correctamente" });
    } catch (error: any) {
        res.status(500).json({ error: "Error al eliminar la respuesta archivo", details: error.message });
    }
};

