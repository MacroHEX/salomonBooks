import React from 'react';
import {Card, CardContent} from "@/components/ui/card";
import Image from 'next/image';

interface Book {
  id: number;
  titulo: string;
  autor: string;
  editorial: string;
  isbn: string;
  totalCopias: number;
  copiasDisponibles: number;
  resumen: string | null;
  fechaPublicacion: Date;
  imagenPortada: string | null;
  categoria: string;
}

interface BookCardProps {
  book: Book;
}

const BookCard = ({book}: BookCardProps) => {
  return (
    <Card className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <div className="relative w-full aspect-[3/4] rounded-t-lg overflow-hidden">
        <Image
          src={book.imagenPortada ? book.imagenPortada : ''}
          alt={`Cover of ${book.titulo}`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1800px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="text-md font-semibold mb-1 line-clamp-1" title={book.titulo}>
          {book.titulo}
        </h3>
        <p className="text-sm text-gray-500 mb-2 line-clamp-1" title={book.autor}>
          {book.autor}
        </p>
      </CardContent>
    </Card>
  );
};

export default BookCard;
