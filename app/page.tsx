'use client'

import {useSession} from "next-auth/react";
import Home from "@/screens/Home";

export default function HomePage() {

  const {data: session} = useSession();

  return (

    <>
      <Home/>
    </>
  );
}
