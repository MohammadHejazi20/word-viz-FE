import { render, screen, waitFor } from "@testing-library/react";
import useWebSocket from "react-use-websocket";
import { beforeEach, describe, it, vi } from "vitest";
import App from "../src/App";

const mockPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    date_gmt: "2025-02-27T10:28:53",
    link: "https://example.com/post/1",
    modified_gmt: "2025-03-05T14:45:22",
    contentWords: [
      { word: "Next.js", count: 15 },
      { word: "React", count: 12 },
      { word: "JavaScript", count: 8 },
      { word: "Framework", count: 6 },
      { word: "Component", count: 10 },
      { word: "Routing", count: 7 },
      { word: "Server", count: 9 },
      { word: "Client", count: 5 },
      { word: "Rendering", count: 11 },
    ],
    excerptWords: [
      { word: "Tutorial", count: 3 },
      { word: "Beginner", count: 2 },
      { word: "Web", count: 5 },
      { word: "Development", count: 4 },
      { word: "Frontend", count: 6 },
    ],
  },
  {
    id: 2,
    title: "Advanced TypeScript Patterns",
    date_gmt: "2025-03-12T09:15:37",
    link: "https://example.com/post/2",
    modified_gmt: "2025-03-18T16:20:05",
    contentWords: [
      { word: "TypeScript", count: 20 },
      { word: "Interface", count: 14 },
      { word: "Generic", count: 10 },
      { word: "Type", count: 18 },
      { word: "Class", count: 8 },
      { word: "Function", count: 12 },
      { word: "Object", count: 15 },
      { word: "Array", count: 9 },
      { word: "Union", count: 7 },
      { word: "Intersection", count: 6 },
      { word: "Utility", count: 11 },
    ],
    excerptWords: [
      { word: "Advanced", count: 4 },
      { word: "Programming", count: 6 },
      { word: "Development", count: 3 },
      { word: "Language", count: 5 },
      { word: "Static", count: 2 },
      { word: "Typing", count: 7 },
    ],
  },
];

vi.mock("react-use-websocket", () => ({
  default: vi.fn(),
}));

const mockUseWebSocket = useWebSocket as jest.Mock;

describe("App", () => {
  beforeEach(() => {
    mockUseWebSocket.mockReturnValue({
      lastJsonMessage: null,
    });
  });

  it("renders the App component with default state", () => {
    render(<App />);

    expect(
      screen.getByText("Actively waiting for new posts...")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Blog Word Stats/i })
    ).toBeInTheDocument();
  });

  it("renders posts when WebSocket receives messages", async () => {
    mockUseWebSocket.mockReturnValue({
      lastJsonMessage: mockPosts,
    });

    render(<App />);

    await waitFor(() => {
      mockPosts.forEach((post) => {
        expect(screen.getByText(post.title)).toBeInTheDocument();
      });
    });
  });

  it("appends new posts when WebSocket receives additional messages", async () => {
    const initialPosts = [mockPosts[0]];
    const newPosts = [mockPosts[1]];

    let lastJsonMessage = initialPosts;

    mockUseWebSocket.mockImplementation(() => ({
      get lastJsonMessage() {
        return lastJsonMessage;
      },
    }));

    const { rerender } = render(<App />);

    await waitFor(() => {
      expect(screen.getByText(initialPosts[0].title)).toBeInTheDocument();
    });

    lastJsonMessage = newPosts;
    rerender(<App />);

    await waitFor(() => {
      expect(screen.getByText(newPosts[0].title)).toBeInTheDocument();
    });
  });
});
