import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DataTable } from "../../src/components/data-table";

describe("DataTable Component", () => {
  const mockData = [
    { word: "hello", count: 5 },
    { word: "world", count: 3 },
    { word: "test", count: 8 },
  ];

  it("renders the table with correct data", () => {
    render(<DataTable data={mockData} title="Test Table" />);

    expect(screen.getByText("Test Table")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.getByText("world")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("renders the correct number of items in the badge", () => {
    render(<DataTable data={mockData} title="Test Table" />);

    expect(screen.getByText("3 items")).toBeInTheDocument();
  });

  it("filters the table based on search input", () => {
    render(<DataTable data={mockData} title="Test Table" />);

    const searchInput = screen.getByPlaceholderText("Filter words...");
    fireEvent.change(searchInput, { target: { value: "hello" } });

    expect(screen.getByText("hello")).toBeInTheDocument();
    expect(screen.queryByText("world")).not.toBeInTheDocument();
    expect(screen.queryByText("test")).not.toBeInTheDocument();
  });

  it.skip("sorts the table by word column", () => {
    render(<DataTable data={mockData} title="Test Table" />);

    const wordHeader = screen.getByText("Word");
    fireEvent.click(wordHeader); // Sort ascending
    const rows = screen.getAllByRole("row");
    expect(rows[3]).toHaveTextContent("world");
    expect(rows[2]).toHaveTextContent("test");
    expect(rows[1]).toHaveTextContent("hello");

    fireEvent.click(wordHeader); // Sort descending
    expect(rows[3]).toHaveTextContent("hello");
    expect(rows[2]).toHaveTextContent("test");
    expect(rows[1]).toHaveTextContent("world");
  });

  it.skip("sorts the table by count column", () => {
    render(<DataTable data={mockData} title="Test Table" />);

    const countHeader = screen.getByText("Count");
    fireEvent.click(countHeader); // Sort ascending
    const rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent("world");
    expect(rows[2]).toHaveTextContent("hello");
    expect(rows[3]).toHaveTextContent("test");

    fireEvent.click(countHeader); // Sort descending
    expect(rows[1]).toHaveTextContent("test");
    expect(rows[2]).toHaveTextContent("hello");
    expect(rows[3]).toHaveTextContent("world");
  });

  it("displays 'No results.' when no data matches the filter", () => {
    render(<DataTable data={mockData} title="Test Table" />);

    const searchInput = screen.getByPlaceholderText("Filter words...");
    fireEvent.change(searchInput, { target: { value: "nonexistent" } });

    expect(screen.getByText("No results.")).toBeInTheDocument();
  });
});
