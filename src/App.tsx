import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { PostsGrid } from "./components/posts-grid";
import Show from "./components/show";
import { Post } from "./types/post";
import { config } from "./lib/utils";
import Header from "./components/header";
import { LoadingSpinner } from "./components/loader-spinner";
import { filterUniquePosts } from "./lib/filter-unique-posts";
import { Button } from "./components/ui/button";

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    lastJsonMessage,
    readyState,
    getWebSocket,
  }: {
    lastJsonMessage: Post[] | null;
    readyState: number;
  } = useWebSocket(config.SOCKET_URL, {
    share: false,
    shouldReconnect: () => true,
    onError: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    handleWebSocke(lastJsonMessage, readyState);
  }, [lastJsonMessage, readyState]);

  const handleWebSocke = (message: Post[] | null, state: number): void => {
    if (message) {
      updatePosts(message);
      setIsLoading(false);
    } else if (state === WebSocket.CONNECTING) {
      setIsLoading(true);
    }
  };

  const updatePosts = (newPosts: Post[]): void => {
    setPosts((prevPosts) => {
      const uniquePosts = filterUniquePosts(prevPosts, newPosts);
      return [...prevPosts, ...uniquePosts];
    });
  };

  const handleRefresh = () => {
    setIsLoading(true);
    getWebSocket().send("refresh");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="container mx-auto py-8">
      <Header
        connectionStatus={readyState}
        githubUrl={config.FE_URL}
        apiDocsUrl={config.BE_URL}
        title="Blog Word Stats"
      />
      <Show>
        <Show.When isTrue={posts.length > 0}>
          <PostsGrid posts={posts} />
        </Show.When>
        <Show.Else>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold mb-4">No posts available</h2>
            <p className="text-gray-600">
              Please check back later for new posts, or try refreshing the page.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={handleRefresh}
            >
              Refresh
            </Button>
          </div>
        </Show.Else>
      </Show>
    </main>
  );
}
