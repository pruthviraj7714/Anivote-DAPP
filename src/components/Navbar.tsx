"use client";

import { useAccount, useDisconnect } from "wagmi";
import { Button } from "./ui/button";
import { redirect, useRouter } from "next/navigation";

export default function Navbar() {
  const { disconnect } = useDisconnect();
  const { isConnected } = useAccount();

  const router = useRouter();
  if (!isConnected) {
    redirect("/");
  }

  return (
    <div className="p-4 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-300 shadow-xl border-b border-slate-500 flex justify-between items-center">
      <div onClick={() => router.push('/home')} className="text-2xl font-extrabold cursor-pointer">
        <span className="text-orange-400">
          Social
          <span className="text-pink-400">Snap</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button variant={"outline"} className="font-semibold" onClick={() => router.push("/add-post")}>Add Post</Button>
        <Button variant={"outline"} onClick={() => router.push("/profile")}  className="font-semibold">
          Profile
        </Button>

        <Button variant={"destructive"} onClick={() => disconnect()}>
          Disconnect
        </Button>
      </div>
    </div>
  );
}
