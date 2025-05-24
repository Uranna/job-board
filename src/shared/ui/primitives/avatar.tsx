import { Avatar as AvatarRadix } from "radix-ui";
import React, { FC, PropsWithChildren } from "react";

type AvatarProps = PropsWithChildren & {
  avatarUrl?: string;
  name?: string;
};

export const Avatar: FC<AvatarProps> = ({ avatarUrl, name = '' }) => {
  const nameArray = name.split(' ');
  const initials = nameArray.length > 1 ? nameArray.slice(0, 2).map(([firstWord]) => firstWord).join() : nameArray[0].slice(0, 2);

  if (!(initials || avatarUrl)) {
    return null
  }

  return (
    <AvatarRadix.Root className="h-8 w-8 rounded-full overflow-hidden flex justify-center items-center">
      {avatarUrl && (
        <AvatarRadix.Image
          src={avatarUrl}
          alt={name}
          className="h-full w-full object-cover"
        />
      )}
      <AvatarRadix.Fallback className="flex h-full w-full items-center justify-center bg-blue-600 text-white">
        {initials.toUpperCase()}
      </AvatarRadix.Fallback>
    </AvatarRadix.Root>
  );
};