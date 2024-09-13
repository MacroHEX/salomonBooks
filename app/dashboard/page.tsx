'use client'

import React from 'react';
import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

const DashboardPage = () => {
  const {data: session} = useSession();

  if (session?.user.role !== 'ADMIN') {
    redirect('/')
  }

  return (
    <div>
      Agregar libro
    </div>
  );
};

export default DashboardPage;