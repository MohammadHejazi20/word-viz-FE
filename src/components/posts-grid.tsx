import { Post } from "@/types/post";
import { PostCard } from "./post-card";

interface PostsGridProps {
  posts: Post[];
}

export function PostsGrid({ posts }: PostsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      {posts.map((post, index) => (
        <PostCard key={`${post.id}-${index}`} post={post} />
      ))}
    </div>
  );
}
