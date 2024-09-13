import React from 'react';
import BookCard from "@/components/cards/BookCard";
import {useSession} from "next-auth/react";

const books = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    coverImage: 'https://cdn.donmai.us/original/ec/b6/__elaina_majo_no_tabitabi_drawn_by_azuuru__ecb661ece9c5c11cf8ecedae8281d5cc.jpg'
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    coverImage: 'https://cdn.donmai.us/original/34/ff/__anne_crow_madousho_gakuen_no_kinsho_shoujo_drawn_by_mikisai__34ffd21c930c2c7f52ef533e4f1d401a.png'
  },
  {
    id: '3',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    coverImage: 'https://cdn.donmai.us/original/18/8f/__nanba_yukina_dokuzetsu_shoujo_wa_amanojaku_drawn_by_mirei__188f76c2925e5773cb80014dea93f85b.jpg'
  },
]

const Home = () => {

  const {data: session} = useSession();

  console.log(session?.user)

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Library Collection</h1>
      <div className="flex">
        {books.map((book) => (
          <BookCard key={book.id} book={book}/>
        ))}
      </div>
    </div>
  );
};

export default Home;