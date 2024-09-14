// app/api/libros/[id]/route.ts
import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

interface CustomError extends Error {
  message: string;
}

// GET request to retrieve a single libro by ID
export async function GET(req: Request, {params}: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    const libro = await prisma.libro.findUnique({
      where: {id},
    });

    if (!libro) {
      return NextResponse.json({message: "Libro no encontrado"}, {status: 404});
    }

    return NextResponse.json(libro, {status: 200});
  } catch (error) {
    const err = error as CustomError;
    return NextResponse.json({message: `No se pudo encontrar el libro ${err.message}`}, {status: 500});
  }
}

// PUT request to update a libro by ID
export async function PUT(req: Request, {params}: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    const data = await req.json();

    const updatedLibro = await prisma.libro.update({
      where: {id},
      data,
    });

    return NextResponse.json(updatedLibro, {status: 200});
  } catch (error) {
    const err = error as CustomError;
    return NextResponse.json({message: `Error al actualizar el libro ${err.message}`}, {status: 500});
  }
}

// DELETE request to delete a libro by ID
export async function DELETE(req: Request, {params}: { params: { id: string } }) {
  const id = Number(params.id);

  try {
    await prisma.libro.delete({
      where: {id},
    });

    return NextResponse.json({message: "Libro Borrado con Exito"}, {status: 200});
  } catch (error) {
    const err = error as CustomError;
    return NextResponse.json({message: `Error al borrar el libro: ${err.message}`}, {status: 500});
  }
}
