import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { PostsGrid } from "./components/posts-grid";
import Show from "./components/show";
import { Post } from "./types/post";
import { config } from "./lib/utils";
import Header from "./components/header";

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { lastJsonMessage } = useWebSocket(config.SOCKET_URL, {
    share: false,
    shouldReconnect: () => true,
  });

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    if (lastJsonMessage !== undefined && lastJsonMessage !== null) {
      setPosts((prevPosts) => [
        ...prevPosts,
        ...(Array.isArray(lastJsonMessage) ? lastJsonMessage : []),
      ]);
    }
  }, [lastJsonMessage]);

  return (
    <main className="container mx-auto py-8">
      <Header
        githubUrl={config.FE_URL}
        apiDocsUrl={config.BE_URL}
        title="Blog Word Stats"
      />
      <Show>
        <Show.When isTrue={posts.length > 0}>
          <PostsGrid posts={posts} />
        </Show.When>
        <Show.Else>Actively waiting for new posts...</Show.Else>
      </Show>
    </main>
  );
}
