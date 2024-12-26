"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

export default function ConnectPage() {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) {
      const storedUserId = localStorage.getItem("userId");
      const storedAddress = storedUserId?.includes("address:") 
        ? storedUserId.split("address:")[1] 
        : null;

      if (!storedAddress) {
        router.push("/create-profile");
      } else if (storedAddress === address) {
        router.push("/home");
      } else {
        router.push("/create-profile");
      }
    }
  }, [isConnected, address, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      {connectors.map((connector) =>
        connector.name.toLowerCase() === "metamask" ? (
          <Button
            key={connector.id}
            className="bg-orange-500 text-white font-semibold hover:bg-orange-600"
            onClick={() => connect({ connector })}
          >
            Connect to MetaMask
          </Button>
        ) : null
      )}
    </div>
  );
}
