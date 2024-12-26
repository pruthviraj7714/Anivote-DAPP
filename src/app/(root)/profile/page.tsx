"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { config } from "@/config/config";
import { ABI } from "@/lib/abi";
import { PostProps } from "@/types/types";
import {
  Camera,
  Edit3,
  FileText,
  LucideLoader,
  Mail,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useWriteContract } from "wagmi";
import { readContract } from "wagmi/actions";

const CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`;

export default function ProfilePage() {
  const { address } = useAccount();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [userPosts, setUserPosts] = useState<PostProps[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { writeContractAsync, data, error } = useWriteContract({
    config: config,
  });

  const fetchProfileInfo = async () => {
    setLoading(true);
    try {
      const response = await readContract(config, {
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: "getUserProfile",
        args: [address],
        account: address,
      });
      //@ts-ignore
      setUsername(response[0]);
      //@ts-ignore

      setFullName(response[1]);
      //@ts-ignore

      setBio(response[2]);
      //@ts-ignore

      setProfilePicture(response[3]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const posts = await readContract(config, {
        abi: ABI,
        functionName: "getMyPosts",
        address: CONTRACT_ADDRESS,
        account: address,
      });

      setUserPosts(posts as unknown as PostProps[]);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteProfile = async () => {
    try {
      await writeContractAsync({
        abi: ABI,
        address: CONTRACT_ADDRESS,
        functionName: "deleteUserProfile",
        account: address,
      });
      toast.success("Profile Successfully deleted");
      localStorage.removeItem('userId');
      localStorage.removeItem('likedPosts');
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    fetchProfileInfo();
    fetchUserPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LucideLoader className="animate-spin size-7 text-pink-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="w-full overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader className="relative p-0">
            <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500"></div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <Avatar className="h-24 w-24 ring-4 ring-white">
                <AvatarImage src={profilePicture} alt="Profile picture" />
                <AvatarFallback className="text-2xl font-bold">
                  {fullName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </CardHeader>
          <CardContent className="pt-16 px-4 sm:px-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{fullName}</h2>
              <p className="text-gray-500">@{username}</p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <Label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    className="pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Username"
                    disabled
                    value={username}
                  />
                </div>
              </div>
    
              <div className="relative">
                <Label
                  htmlFor="bio"
                  className="text-sm font-medium text-gray-700"
                >
                  Bio
                </Label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FileText
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <Input
                    type="text"
                    name="bio"
                    id="bio"
                    className="pl-10 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Username"
                    disabled
                    value={bio}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-end justify-end">
              <Button onClick={deleteProfile} variant={"destructive"}>
              Delete Account
            </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full shadow-lg transition-shadow duration-300 hover:shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <h3 className="text-xl font-bold text-gray-800">My Posts</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/add-post")}
            >
              <Camera className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </CardHeader>
          <CardContent>
            {userPosts && userPosts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {userPosts.map((post) => (
                  <div
                    key={post.id}
                    className="group overflow-hidden rounded-lg"
                  >
                    <img
                      src={post.url}
                      alt={`Post ${post.id}`}
                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
        
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  You haven't posted anything yet
                </p>
                <Button onClick={() => router.push("/add-post")}>
                  Create Your First Post
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
