"use client";

import React, { useEffect, useCallback } from "react";
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
import axios from "axios";

const CustomAccount = () => {
  const { user } = useUser();
  const { isSignedIn, userId } = useAuth();

  // Function to handle user authentication request
  const handleAuthentication = useCallback(async () => {
    if (isSignedIn && user) {
      try {
        const res = await axios.post(
          "http://localhost:5913/api/auth/authenticate",
          {
            userId: userId,
            fullName: user.fullName || null,
            emailAddress: user.primaryEmailAddress?.emailAddress || null,
            imageUrl: user.imageUrl || null,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
          }, {
            "headers": {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${userId}`
            },
            withCredentials: true, 
          }
        );
        if (res) {
          return;
        }
      } catch (error) {
        console.log("Error during user authentication:", error);
      }
    }
  }, [isSignedIn, user, userId]);

  // Trigger the authentication when user is signed in
  useEffect(() => {
    handleAuthentication();
  }, [handleAuthentication]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="z-[999999]" asChild>
        <User />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white z-[999999]">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {isSignedIn && user && (
            <>
              <DropdownMenuItem>
                {user.imageUrl && (
                  <Image
                    src={user.imageUrl || ""}
                    width={40}
                    height={40}
                    alt="profile image"
                    className="rounded-full"
                  />
                )}
                <span>{user.fullName}</span>
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
