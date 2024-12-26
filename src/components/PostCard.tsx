import { GoHeart, GoHeartFill } from "react-icons/go"
import { Card, CardContent } from "@/components/ui/card";
import { PostProps } from "@/types/types";

export default function PostCard({
  post,
  onLike,
  onRemoveLike,
  isLiked,
}: {
  post: PostProps;
  onLike: () => void;
  onRemoveLike: () => void;
  isLiked: boolean;
}) {
  return (
    <Card className="w-64 overflow-hidden transition-all duration-300 border border-black/55 hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[2/3] w-full">
        <img
          src={post.url}
          alt={post.title}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="p-4">
        <h3
          className="font-semibold text-lg mb-2 line-clamp-1"
          title={post.title}
        >
          {post.title}
        </h3>
        <div className="flex items-center text-sm gap-1.5">
          {isLiked ? (
            <div className="flex items-center gap-1.5" onClick={onRemoveLike}>
              <GoHeartFill className={`size-5 text-pink-500 cursor-pointer`} />
            </div>
          ) : (
            <div className="flex items-center gap-1.5" onClick={onLike}>
              <GoHeart className={`size-5 cursor-pointer`} />
            </div>
          )}
          <span>{post.likes}</span>
        </div>
      </CardContent>
    </Card>
  );
}
