/* "use client";
import { useAuth, useUser, } from "@clerk/clerk-react";
import { SignInButton } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useCallback } from "react";

interface UserResponse {
  message: string;
  data: {
    userId: string;
    fullName: string;
    email: string | null;
    imageUrl: string;
  };
}

interface UserData {
  userId: string;
  fullName: string | null;
  emailAddress: string | null;
  imageUrl: string | null;
  firstName: string;
  lastName: string;
}

export default function Page() {
  const { user } = useUser();
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();

  const userMutate = useMutation<UserResponse, Error, UserData>({
    mutationKey: ["user", userId],
    mutationFn: async (data: UserData) => {
      const res = await axios.post(
        "http://localhost:5913/api/auth/authenticate",
        data
      );
      return res.data;
    },
  });

  const handleUserAuthenticate = useCallback(async () => {
    if (!isSignedIn || !user || !userId) return;

    const userData: UserData = {
      userId: userId,
      fullName: user?.fullName || null,
      emailAddress: user?.primaryEmailAddress?.emailAddress || null,
      imageUrl: user?.imageUrl || null,
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
    };

    try {
      await userMutate.mutateAsync(userData);
    } catch (error) {
      console.log("Error updating:", error);
    }
  }, [isSignedIn, userId, user, userMutate]);

  useEffect(() => {
    if (isSignedIn && user && userId) {
      handleUserAuthenticate();
    }
  }, [isSignedIn, user, userId, handleUserAuthenticate]);

  useEffect(() => {
    // Redirect to dashboard on successful mutation
    if (userMutate.isSuccess) {
        console.log("Console")
      router.push("/");
    }
    // Optional: You could handle error feedback here
    if (userMutate.isError) {
      console.error("Error during user authentication:", userMutate.error);
    }
  }, [router, userMutate.isSuccess, userMutate.error]);

  return (
    <div className="w-full min-h-screen bg-white grid place-content-center">
      <h2 className="text-2xl font-semibold text-center">Swift Mart | Login</h2>
      <p className="mb-10">Shop all your products from Swift Mart</p>
      <div className="bg-black text-white text-xl text-center py-3 rounded-xl">
        <SignInButton />
      </div>
      <div className="flex items-center gap-2 my-5">
        <p>Already have an account?</p>
        <Link href={"/sign-up"} className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
 */


import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page