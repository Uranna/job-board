'use client'

import { userAtom } from "@/shared/store/userInfo";
import { Button } from "@/shared/ui/primitives/button";
import axios from "axios";
import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import React from "react";

export default function ProfilePage() {
  const [_, setUser] = useAtom(userAtom);
  const handleLogout = async () => {
    await axios.get('/api/auth/logout');
    setUser(null);
    redirect('/login');
  };

  return (
    <Button onClick={handleLogout}>Выйти</Button>
  );
};