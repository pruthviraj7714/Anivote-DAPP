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

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "The title should be at least of 3 characters" }),
  url: z.string().url({ message: "The URL should be valid!" }),
});

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function AddAnimePage() {
const { address} = useAccount();
  const { writeContractAsync } = useWriteContract({
    config: config,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, url } = values;
    try {
      await writeContractAsync({
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: 'createPost',
        args: [title, url],
        account : address as `0x${string}`
      });
      toast.success("Post Successfully added");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-gray-100 to-gray-200 h-screen">
      <div className="border border-slate-400 bg-white/80 p-6 w-full rounded-lg max-w-xl shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter anime title here" {...field} />
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
                    <FormLabel>Media URL</FormLabel>
                    <FormControl>
                      <Input placeholder="Paste URL of media here" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add</Button>
            </form>
          </Form>
      </div>
    </div>
  );
}
