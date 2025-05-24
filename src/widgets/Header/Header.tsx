'use client'
import * as React from "react";
import { Button } from "@/shared/ui/primitives/button";
import Link from "next/link";
import { Avatar } from "@/shared/ui/primitives/avatar";
import { useAtom } from "jotai";
import { userAtom } from "@/shared/store/userInfo";

export const Header = () => {
  const [user] = useAtom(userAtom);

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-gray-700 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        
        {/* Логотип */}
        <Link href={'/'}>
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            <span className="font-bold">Логотип</span>
          </div>
        </Link>


        <Link href={'/profile'}>
          <Button variant='ghost' className="flex gap-2">
            <Avatar avatarUrl={user?.avatarUrl} name={user?.name || user?.email} />
            <span className="hidden sm:inline font-medium">
              {user?.name || user?.email || 'В профиль'}
            </span>
          </Button>
        </Link>
      </div>
    </header>
  );
};