import { Post } from "@/types/post";

export const filterUniquePosts = (
  prevPosts: Post[],
  newPosts: Post[]
): Post[] => {
  return newPosts.filter(
    (newPost) =>
      !prevPosts.some(
        (post) =>
          new Date(post.modified_gmt).getTime() ===
          new Date(newPost.modified_gmt).getTime()
      )
  );
};
