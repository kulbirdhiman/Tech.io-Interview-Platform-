"use client";

import Link from "next/link";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="w-full h-16 px-6 bg-white shadow flex items-center justify-between">
      {/* Logo */}
      <Link href="/" className="text-xl font-semibold">
        Karan Dhiman
      </Link>

      <div className="flex items-center gap-4">
        
        {/* When user is NOT logged in */}
        <SignedOut>
          {/* Login Modal Button */}
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">
              Login
            </button>
          </SignInButton>

          {/* Sign Up Modal Button */}
          <SignUpButton mode="modal">
            <button className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>

        {/* When user IS logged in */}
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
              },
            }}
            afterSignOutUrl="/"
          />
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
