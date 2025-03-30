import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";
import Header from "../../src/components/header";

describe("Header Component", () => {
  const title = "Test Title";
  const githubUrl = "https://github.com/test-repo";
  const apiDocsUrl = "https://api-docs.test.com";

  it("renders the title correctly", () => {
    render(<Header title={title} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders the GitHub button when githubUrl is provided", () => {
    render(<Header title={title} githubUrl={githubUrl} />);
    const githubButton = screen.getByRole("link", { name: /GitHub/i });
    expect(githubButton).toBeInTheDocument();
    expect(githubButton).toHaveAttribute("href", githubUrl);
  });

  it("does not render the GitHub button when githubUrl is not provided", () => {
    render(<Header title={title} />);
    expect(
      screen.queryByRole("link", { name: /GitHub/i })
    ).not.toBeInTheDocument();
  });

  it("renders the API Docs button when apiDocsUrl is provided", () => {
    render(<Header title={title} apiDocsUrl={apiDocsUrl} />);
    const apiDocsButton = screen.getByRole("link", { name: /API Docs/i });
    expect(apiDocsButton).toBeInTheDocument();
    expect(apiDocsButton).toHaveAttribute("href", apiDocsUrl);
  });

  it("does not render the API Docs button when apiDocsUrl is not provided", () => {
    render(<Header title={title} />);
    expect(
      screen.queryByRole("link", { name: /API Docs/i })
    ).not.toBeInTheDocument();
  });
});
