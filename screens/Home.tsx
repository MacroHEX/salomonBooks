'use client'

import React from 'react';
import BookCard from "@/components/cards/BookCard";
import {useSession} from "next-auth/react";
import {getLibros} from "@/lib/libros";

const Home = async () => {

  const {data: session} = useSession();

  const books = await getLibros();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Novedades</h1>
      <div className="flex">
        {books.map((book) => (
          <BookCard key={book.id} book={book}/>
        ))}
      </div>
    </div>
  );
};

export default Home;