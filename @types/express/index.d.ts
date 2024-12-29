import { Usuario } from "@prisma/client";
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: Usuario;
      file?: Multer.File;
    }
  }
}

export {};