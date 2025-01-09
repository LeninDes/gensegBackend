import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import multer from 'multer';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/carousel");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({ storage });

export const createCarouselConfig = async (req: Request, res: Response) => {
    const { title1, desc1, title2, desc2, title3, desc3, title4, desc4 } = req.body;
    const files = req.files as Express.Multer.File[];
    
    console.log(files, "files recibidos");
    console.log("title1", title1, "desc1", desc1, "title2", title2, "desc2", desc2, "title3", title3, "desc3", desc3, "title4", title4, "desc4", desc4);  
    if (!title1 || !desc1 || !title2 || !desc2 || !title3 || !desc3 || !title4 || !desc4 || files.length !== 4) {
        return res.status(400).json({ error: "All titles, descriptions, and 4 images are required." });
    }
    try {

        const carouselData = [
            {idcarrusel: 1, titulo: title1, subtitulo: desc1, img: files[0].path },
            {idcarrusel: 2, titulo: title2, subtitulo: desc2, img: files[1].path },
            {idcarrusel: 3, titulo: title3, subtitulo: desc3, img: files[2].path },
            {idcarrusel: 4, titulo: title4, subtitulo: desc4, img: files[3].path },
        ];


        const isCarrusel = await prisma.carrusel.findMany({});
        if (isCarrusel.length === 0) {
            const carousel = await prisma.carrusel.createMany({
                data: carouselData,
            });
            if (!carousel) {
                res.status(404).json({ error: "Carousel configuration not found." });
                return;
            }
            res.status(201).json({ message: "Carousel configuration saved successfully.", carousel });
            return;
        }
        else{
            // Actualizar múltiples registros usando Promise.all
            const updatePromises = carouselData.map((data) => 
                prisma.carrusel.update({
                    where: { idcarrusel: data.idcarrusel },
                    data: {
                        titulo: data.titulo,
                        subtitulo: data.subtitulo,
                        img: data.img,
                    },
                })
            
            );
            const updatedCarousels = await Promise.all(updatePromises);
            res.status(201).json({ message: "Carousel configuration updated successfully.", updatedCarousels });
            return;
        }
        
    } catch (error) {
        console.error("Error saving carousel configuration:", error);
        res.status(500).json({ error: "Internal server error." });
        return;
    }
};
/*
export const updateCarouselConfig = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title1, desc1, title2, desc2, title3, desc3, title4, desc4 } = req.body;
    const files = req.files as Express.Multer.File[];

    if (!title1 || !desc1 || !title2 || !desc2 || !title3 || !desc3 || !title4 || !desc4 || files.length !== 4) {
        return res.status(400).json({ error: "All titles, descriptions, and 4 images are required." });
    }

    try {
        const carousel = await prisma.carrusel.update({
            where: { id: Number(id) },
            data: {
                images: {
                    updateMany: [
                        { where: { id: 1 }, data: { title: title1, description: desc1, imagePath: files[0].path } },
                        { where: { id: 2 }, data: { title: title2, description: desc2, imagePath: files[1].path } },
                        { where: { id: 3 }, data: { title: title3, description: desc3, imagePath: files[2].path } },
                        { where: { id: 4 }, data: { title: title4, description: desc4, imagePath: files[3].path } },
                    ],
                },
            },
        });

        res.status(200).json({ message: "Carousel configuration updated successfully.", carousel });
    } catch (error) {
        console.error("Error updating carousel configuration:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};*/

export const getCarouselConfig = async (req: Request, res: Response) => {
    try {
        const carousel = await prisma.carrusel.findMany({});

        if (!carousel) {
            return res.status(404).json({ error: "Carousel configuration not found." });
        }

        res.status(200).json(carousel);
    } catch (error) {
        console.error("Error fetching carousel configuration:", error);
        res.status(500).json({ error: "Internal server error." });
        return;
    }
};
/*
export const deleteCarouselConfig = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.carousel.delete({
            where: { id: Number(id) },
        });

        res.status(200).json({ message: "Carousel configuration deleted successfully." });
    } catch (error) {
        console.error("Error deleting carousel configuration:", error);
        res.status(500).json({ error: "Internal server error." });
    }
};*/
