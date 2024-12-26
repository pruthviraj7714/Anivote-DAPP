"use client";
import PostCard from "@/components/PostCard";
import { config } from "@/config/config";
import { ABI } from "@/lib/abi";
import { LikeDataProps, PostProps } from "@/types/types";
import { LucideLoader } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useWriteContract } from "wagmi";
import { readContract } from "wagmi/actions";

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function Home() {
  const { isConnected } = useAccount();
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [likedPosts, setLikedPosts] = useState<LikeDataProps[]>([]);
  const { writeContractAsync } = useWriteContract({});
  const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isConnected) redirect("/");
  }, [isConnected]);

  const fetchLikedPosts = () => {
    try {
      const stored = localStorage.getItem("likedPosts");
      const parsed = stored
        ? JSON.parse(stored, (key, value) =>
            /^\d+$/.test(value) ? BigInt(value) : value
          )
        : [];
      setLikedPosts(parsed as LikeDataProps[]);
    } catch (error) {
      console.error("Failed to load liked posts:", error);
      setLikedPosts([]);
    }
  };

  const updateLikedPosts = (updatedPosts: LikeDataProps[]) => {
    try {
      setLikedPosts(updatedPosts);
      localStorage.setItem(
        "likedPosts",
        JSON.stringify(updatedPosts, (key, value) =>
          typeof value === "bigint" ? value.toString() : value
        )
      );
    } catch (error) {
      console.error("Failed to save liked posts:", error);
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const posts = await readContract(config,{
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: "getAllPosts",
        account : address
      });
      setPosts(posts as unknown as PostProps[]);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch posts.");
    } finally {
      setIsLoading(false);
    }
  };

  // Like a post
  const likePost = async (userAddress: `0x${string}`, index: number) => {
    try {
      await writeContractAsync({
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: "likePost",
        args: [userAddress, index],
        account : address
      });
      const updatedLikes = [...likedPosts, { index, user: userAddress }];
      updateLikedPosts(updatedLikes);
    } catch (error: any) {
      toast.error(`Failed to like post: ${error.message}`);
    }
  };

  const removeLike = async (userAddress: `0x${string}`, index: number) => {
    try {
      await writeContractAsync({
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: "removeLike",
        args: [userAddress, index],
      });
      const updatedLikes = likedPosts.filter(
        (like) => !(like.index === index && like.user === userAddress)
      );
      updateLikedPosts(updatedLikes);
    } catch (error: any) {
      toast.error(`Failed to remove like: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchLikedPosts();
    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LucideLoader className="animate-spin size-10 text-pink-400" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => likePost(post.user, post.id)}
            onRemoveLike={() => removeLike(post.user, post.id)}
            isLiked={likedPosts.some(
              (like) => like.index === post.id && like.user === post.user
            )}
          />
        ))}
      </div>
    </div>
  );
}
