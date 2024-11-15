"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import { useAuth, useUser, SignInButton, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
const CustomAccount = () => {
  const { user } = useUser();
  const { isSignedIn } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-[999999]" asChild>
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white z-[999999]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isSignedIn && (
            <>
              <DropdownMenuItem>
                {isSignedIn && user?.imageUrl && (
                  <Image
                    src={user?.imageUrl}
                    width={40}
                    height={40}
                    alt="profile image"
                    className="rounded-full"
                  />
                )}
                <span>{user?.fullName}</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="mt-3 p-0">Manage Profile</span>
              </DropdownMenuItem>
            </>
          )}
          <DropdownMenuItem>
            {isSignedIn ? <SignOutButton /> : <SignInButton />}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomAccount;
