import React from 'react';
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import Image from 'next/image';
import {ILibro} from "@/interfaces/ILibros";

interface Props {
  book: ILibro;
}

const BookCard = ({book}: Props) => {
  return (
    <Card
      className="overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 w-40 md:w-80">
      <CardHeader className="relative w-full aspect-[3/4] rounded-t-lg overflow-hidden">
        <Image
          src={book.imagenPortada ? book.imagenPortada : ''}
          alt={`Portada de ${book.titulo}`}
          width={0}
          height={0}
          sizes="100vw"
          className="rounded-md"
          style={{width: '100%', height: 'auto'}}
        />
      </CardHeader>
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
