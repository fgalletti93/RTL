import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import App from "./App";
import { replaceCamalWithSpaces } from "./App";

test("Button has correct initial color", () => {
  render(<App />);
  const button = screen.getByRole("button", { name: "Change to Midnight Blue" });
  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });

  fireEvent.click(button);

  expect(button).toHaveStyle({ backgroundColor: "MidnightBlue" });
  expect(button).toHaveTextContent("Change to Medium Violet Red");
});

test("Expect checkbox to not be checked and button to be enabled", () => {
  render(<App />);

  const button = screen.getByRole("button", { name: "Change to Midnight Blue" });
  expect(button).toBeEnabled();

  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("Checkbox disables button on first click and enables on second click", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button");

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();
});

test("Button becomes gray when disabled and reverts back to red when enabled", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });
  const button = screen.getByRole("button");

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "gray" });

  fireEvent.click(checkbox);
  expect(button).toHaveStyle({ backgroundColor: "MediumVioletRed" });
});

describe("Spaces before camel-case capital letters", () => {
  it("Should work for no inner capital letters", () => {
    expect(replaceCamalWithSpaces("Red")).toBe("Red");
  });
  it("should work for one inner capital letter", () => {
    expect(replaceCamalWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  it("Should work for multiple capital letters", () => {
    expect(replaceCamalWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
