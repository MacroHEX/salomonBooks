'use client'

import React, {useEffect, useState} from 'react';
import BookCard from "@/components/cards/BookCard";
import {useSession} from "next-auth/react";
import {ILibro} from "@/interfaces/ILibros";

const Home = () => {

  const {data: session} = useSession();

  const [libros, setLibros] = useState<ILibro[]>([]);

  useEffect(() => {
    fetch("/api/libros")
      .then((res) => res.json())
      .then((data) => setLibros(data))
      .catch((err) => console.error("Failed to fetch libros:", err));
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Novedades</h1>
      <div className='flex'>
        {libros.map((libro) => (
          <BookCard key={libro.id} book={libro}/>
        ))}
      </div>
    </div>
  );
};

export default Home;