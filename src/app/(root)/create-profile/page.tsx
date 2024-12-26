"use client";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAccount, useWriteContract } from "wagmi";
import { config } from "@/config/config";
import { toast } from "sonner";
import { ABI } from "@/lib/abi";
import { useRouter } from "next/navigation";
import { LucideLoader } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Name should be at least of 3 characters" }),
  username: z
    .string()
    .min(3, { message: "The username should be at least of 3 characters" }),
  url: z.string().url({ message: "The URL should be valid!" }),
  bio: z.string().min(5, { message: "Bio should be at least of 5 characters" }),
});

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function CreateProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { address } = useAccount();
  const { data, writeContractAsync, error } = useWriteContract({
    config: config,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
      fullName: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const { bio, fullName, url, username } = values;
    try {
      await writeContractAsync({
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: "createUserProfile",
        args: [username, fullName, bio, url],
        account : address
      });
      toast.success("Profile Successfully created");
      localStorage.setItem(
        "userId",
        `${Math.random()}ani:${username}address:${address}`
      );
      localStorage.setItem("likedPosts", JSON.stringify([]));
      router.push("/home");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Enter username here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar URL</FormLabel>
                <FormControl>
                  <Input placeholder="Paste URL for avatar here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bio here" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit">
            {isLoading ? (
              <div className="flex justify-center items-center px-6 py-1">
                <LucideLoader className="size-7 animate-spin" />
              </div>
            ) : (
              "Create Profile"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
