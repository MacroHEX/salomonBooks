'use client'

import {useSession} from "next-auth/react";

export default function Home() {

  const {data: session} = useSession();

  return (

    <>
      {session ?
        <h1>{JSON.stringify(session)}</h1> :
        <h1 className='text-8xl'>(❁´◡`❁)</h1>
      }
    </>
  );
}
