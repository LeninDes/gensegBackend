import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();


export const createProject = async (req: Request, res: Response) => {
    const { plan, dni, id_rol, subunidad, EP } = req.body;

    if (!plan || !dni || !id_rol || !subunidad || !EP) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        // Crear proyecto
        const newProject = await prisma.project.create({
            data: {
                plan,
                dni: dni,
                id_rol: Number(id_rol),
                subunidad_id_subuni: Number(subunidad),
                estado: "Pendiente",// actualizar este estado posteriormente
                escuelaProfesional: EP,
            },
        });

        res.status(201).json({ message: 'Proyecto creado exitosamente.', project: newProject, idproj: newProject.idproj });
    } catch (error) {
        console.error('Error al crear el proyecto:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Ocurrió un error al crear el proyecto.' });
    }
};


export const getQuestionsByFormActive = async (req: Request, res: Response): Promise<void> => {

    try {
        const form = await prisma.form.findFirst({ where: {estado: true}});

        const questions = await prisma.prg.findMany({
            where: { idf: Number(form?.idf) },
            include: {
                opcmul: true, // Incluye opciones de preguntas de tipo 'multipleChoice'
                opcuni: true, // Incluye opciones de preguntas de tipo 'singleChoice'
                opcdes: true, // Incluye opciones de preguntas de tipo 'dropdown'
            },
        });

        // Transformar las preguntas en un formato legible
        const formattedQuestions = questions.map((question) => {
            const { idp, type, nmPrg, opcmul, opcuni, opcdes } = question;

            if (type === "multipleChoice") {
                return {
                    id: idp,
                    type,
                    questionText: nmPrg,
                    options: opcmul.map((option) => option.txtOpc),
                };
            }

            if (type === "singleChoice") {
                return {
                    id: idp,
                    type,
                    questionText: nmPrg,
                    options: opcuni.map((option) => option.txtOpc),
                };
            }

            if (type === "dropdown") {
                return {
                    id: idp,
                    type,
                    questionText: nmPrg,
                    options: opcdes.map((option) => option.txtOpc),
                };
            }

            return {
                id: idp,
                type,
                questionText: nmPrg,
            };
        });
        res.status(200).json(formattedQuestions);
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las preguntas", error: error.message });
    }
};

export const createProjectwithActivis = async (req: Request, res: Response) => {
    const { plan, estado, dni, id_rol, subunidad_id_subuni, actividades } = req.body;

    if (!plan || !estado || !dni || !id_rol || !subunidad_id_subuni || !actividades) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        // Crear proyecto
        const newProject = await prisma.project.create({
            data: {
                plan,
                estado,
                dni,
                escuelaProfesional: "",
                id_rol,
                subunidad_id_subuni,
                actividad: {
                    create: actividades.map((actividad: any) => ({
                        name: actividad.name,
                        fInit: new Date(actividad.fInit),
                        fFin: new Date(actividad.fFin),
                        estado: actividad.estado,
                        idres: actividad.idres,
                    })),
                },
            },
        });

        const idf = newProject.idproj;

        res.status(201).json({ message: 'Proyecto creado exitosamente.', project: newProject });
    } catch (error) {
        console.error('Error al crear el proyecto:', error);

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return res.status(400).json({ error: error.message });
        }

        res.status(500).json({ error: 'Ocurrió un error al crear el proyecto.' });
    }
};


export const getActivitysByProject = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params; // Asumimos que el ID viene en los parámetros de la ruta
    try {
        // Validar que se proporciona el ID
        if (!id) {
            res.status(400).json({ message: 'El ID es obligatorio' });
        }
        // Convertir el ID a número (si es necesario)
        const projId = parseInt(id);

        // Verificar que el registro existe
        const ActivitysByProject = await prisma.actividad.findMany({
            where: { idproj: projId },
        });

        // Manejo si `existingSubUnidad` es null
        if (!ActivitysByProject) {
            res.status(404).json({ message: 'No existe actividades de este proyecto' });
        }

        // Enviar respuesta exitosa
        res.status(200).json({ message: 'Actividades del proyecto', actividades: ActivitysByProject});
    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            message: 'Hubo un error al eliminar el formulario',
            error: error.message,
        });
    }

}
