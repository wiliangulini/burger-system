import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("home sanity page", () => {
  it("renders the initial project page", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: "Burger Shop System" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Setup inicial")).toBeInTheDocument();
  });
});
