import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import Footer from "../src/Components/Footer.jsx";

describe("Footer", () => {
  // Test Case 1
  it("should render the Footer component", () => {
    render(<Footer />);

    const homeElement = screen.getByRole("heading", { level: 3 });
    expect(homeElement).toBeInTheDocument();
  });
});

//Test Case 2
it("should have the text salman", () => {
  render(<Footer />);
  const text = screen.queryByText(/Salman Utasa Application/i);
  expect(text).toBeInTheDocument();
});

//Test Case 3
describe("Footer", () => {
  it("should render the copyright text", () => {
    render(<Footer />);
    const copyrightText = screen.getByText("SALMAN UTASA © 2024");
    expect(copyrightText).toBeInTheDocument();
  });
});
