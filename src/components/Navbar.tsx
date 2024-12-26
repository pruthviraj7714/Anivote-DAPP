"use client";

import { useAccount, useDisconnect, useWriteContract } from "wagmi";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function Navbar() {
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  
  const router = useRouter();
  if (!isConnected) {
    redirect("/");
  }

 
  return (
    <div className="p-4 bg-slate-100 shadow-xl border-b border-slate-500 flex justify-between items-center">
      <div
        onClick={() => router.push("/home")}
        className="font-bold text-xl cursor-pointer"
      >
        Logo
      </div>
      <div className="flex items-center gap-2">
        <Button onClick={() => router.push("/add-post")}>Add Post</Button>
          <Button onClick={() => router.push('/profile')} className="">
            Profile
          </Button>
         
        <Button variant={"destructive"} onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    </div>
  );
}
