import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { PostCard } from "../../src/components/post-card";
import { Post } from "@/types/post";

const mockPost: Post = {
  id: 1,
  title: "Test Post",
  link: "https://example.com",
  date_gmt: "2023-01-01T00:00:00Z",
  modified_gmt: "2023-01-02T00:00:00Z",
  contentWords: [
    { word: "example", count: 5 },
    { word: "test", count: 3 },
  ],
  excerptWords: [
    { word: "sample", count: 2 },
    { word: "demo", count: 1 },
  ],
};

describe("PostCard", () => {
  it("renders the post title", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText("Test Post")).toBeInTheDocument();
  });

  it("renders the View Post button with correct link", () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole("link", { name: /View Post/i });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the created and modified dates", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText(/Created:/i)).toHaveTextContent(
      "Created: Jan 1, 2023"
    );
    expect(screen.getByText(/Modified:/i)).toHaveTextContent(
      "Modified: Jan 2, 2023"
    );
  });

  it("renders the content words DataTable", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText("Content Word Counts")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search content words...")
    ).toBeInTheDocument();
  });

  it("renders the excerpt words DataTable", () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText("Excerpt Word Counts")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search excerpt words...")
    ).toBeInTheDocument();
  });
});
