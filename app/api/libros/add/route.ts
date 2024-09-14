// app/api/libros/add/route.ts
import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

interface CustomError extends Error {
  message: string;
}

export async function POST(req: Request) {
  try {
    const {
      titulo,
      autor,
      editorial,
      isbn,
      totalCopias,
      copiasDisponibles,
      resumen,
      fechaPublicacion,
      imagenPortada,
      categoria
    } = await req.json();

    const newLibro = await prisma.libro.create({
      data: {
        titulo,
        autor,
        editorial,
        isbn,
        totalCopias,
        copiasDisponibles,
        resumen,
        fechaPublicacion,
        imagenPortada,
        categoria,
      },
    });

    return NextResponse.json(newLibro, {status: 201});
  } catch (error) {
    const err = error as CustomError;
    return NextResponse.json({message: `Fallo al agregar el libro: ${err.message}`}, {status: 500});
  }
}
