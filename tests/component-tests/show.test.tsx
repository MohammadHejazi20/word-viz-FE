import Show from "@/components/show";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("Show Component", () => {
  it("renders children of Show.When when isTrue is true", () => {
    render(
      <Show>
        <Show.When isTrue={true}>
          <div data-testid="when-true">When True</div>
        </Show.When>
      </Show>
    );

    expect(screen.getByTestId("when-true")).toBeInTheDocument();
  });

  it("does not render children of Show.When when isTrue is false", () => {
    render(
      <Show>
        <Show.When isTrue={false}>
          <div data-testid="when-false">When False</div>
        </Show.When>
      </Show>
    );

    expect(screen.queryByTestId("when-false")).not.toBeInTheDocument();
  });

  it("renders children of Show.Else when no Show.When is true", () => {
    render(
      <Show>
        <Show.When isTrue={false}>
          <div data-testid="when-false">When False</div>
        </Show.When>
        <Show.Else>
          <div data-testid="else">Else Content</div>
        </Show.Else>
      </Show>
    );

    expect(screen.getByTestId("else")).toBeInTheDocument();
  });
});
