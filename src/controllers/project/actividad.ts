import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createActivity = async (req: Request, res: Response): Promise<void> => {
    const { name, fInit, fFin, idproj, idres } = req.body;
    if (!name || !fInit || !fFin || !idproj || !idres ) {
        res.status(400).json({ error: 'Todos los campos son requeridos.' });
        return;
    }
      
      try {
        const newActivity = await prisma.actividad.create({
          data: {
            name,
            fInit,
            fFin,
            estado: "Pendiente",
            idproj,
            idres
          },
        });
        res.status(201).json(newActivity);
      } catch (error) {
        console.error("Error creando formulario:", error);
        res.status(500).json({ error: "Error interno del servidor." });
      } 
};

export const createAnswersAndInsertActivity = async (req: Request, res: Response) => {
    const { responses, idproj, fInit, fFin, name } = req.body;

    if (!responses || !idproj) {
        return res.status(400).json({ error: 'El ID del formulario, las respuestas y los metadatos son requeridos.' });
    }

    try {
        const form = await prisma.form.findFirst({
            where: {
                estado: true,
            }
        });
        if (!form) {
            return res.status(400).json({ error: 'No hay ningún formulario activo.' });
        }
        const idf = form?.idf;

        const resp = await prisma.res.create({
            data: {
                idf: Number(idf),
                date: new Date()
            }
        });

        // Iterar sobre las respuestas y guardarlas
        const savedResponses = await Promise.all(
            Object.entries(responses).map(async ([questionId, answer]) => {
                const questionIdInt = parseInt(questionId); // Convertir la clave a un entero
                const answerString = Array.isArray(answer) ? JSON.stringify(answer) : String(answer); // Manejar arrays
                
                // Obtener tipo de pregunta desde la base de datos
                const question = await prisma.prg.findUnique({
                    where: { idp: questionIdInt },
                });

                if (!question) {
                    console.error(`Pregunta con ID ${questionIdInt} no encontrada.`);
                    return;
                }

                if (question.type === 'text') {
                    // Guardar respuesta de tipo texto
                    await prisma.resTxt.create({
                        data: {
                            idres: resp.idres,
                            idp: question.idp,
                            resTxt: answerString
                        }
                    });
                } else if (question.type === 'multipleChoice') {
                    // Guardar respuesta de tipo opción múltiple
                    if (Array.isArray(answer)) {
                        await Promise.all(
                            answer.map(async (optionId: number) => {
                                await prisma.resOM.create({
                                    data: {
                                        idres: resp.idres,
                                        idp: question.idp,
                                        idomul: optionId
                                    }
                                });
                            })
                        );
                    }
                } else if (question.type === 'singleChoice') {
                    // Guardar respuesta de tipo opción única
                    if (Array.isArray(answer)) {
                        await Promise.all(
                            answer.map(async (optionId: number) => {
                                await prisma.resOU.create({
                                    data: {
                                        idres: resp.idres,
                                        idp: question.idp,
                                        idou: optionId
                                    }
                                });
                            })
                        );
                    }
                } else if (question.type === 'dropdown') {
                    // Guardar respuesta de tipo lista desplegable
                    if (Array.isArray(answer)) {
                        await Promise.all(
                            answer.map(async (optionId: number) => {
                                await prisma.resOD.create({
                                    data: {
                                        idres: resp.idres,
                                        idp: question.idp,
                                        idodes: optionId
                                    }
                                });
                            })
                        );
                    }
                } else if (question.type === 'date') {
                    // Guardar respuesta de tipo fecha
                    await prisma.resDate.create({
                        data: {
                            idres: resp.idres,
                            idp: question.idp,
                            resdate: new Date(answerString)
                        }
                    });
                } else if (question.type === 'archive') {
                    // Guardar respuesta de tipo archivo
                    await prisma.resFile.create({
                        data: {
                            idres: resp.idres,
                            idp: question.idp,
                            resFile: answerString // Guardar nombre o URL del archivo
                        }
                    });
                } else {
                    console.error(`Tipo de pregunta desconocido: ${question.type}`);
                }
            })
        );

        // Crear la actividad asociada
        const activity = await prisma.actividad.create({
            data: {
                fFin: new Date(fFin),
                fInit: new Date(fInit),
                estado: "Pendiente",
                name: name,
                idproj: idproj,
                idres: resp.idres
            }
        });

        res.status(201).json({ 
            message: 'Respuestas guardadas exitosamente.', 
            //data: savedResponses, 
            idres: resp.idres, 
            idActivity: activity.idActivi 
        });
    } catch (error) {
        console.error('Error al guardar las respuestas:', error);
        res.status(500).json({ error: 'Ocurrió un error al guardar las respuestas.' });
    }
};




