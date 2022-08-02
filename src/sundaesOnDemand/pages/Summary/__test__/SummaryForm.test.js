import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SummaryForm from "../SummaryForm.jsx";

test("Should check checkbox enables and disabled button", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("Enables button on first click and disables on second", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name:  /i agree to terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  fireEvent.click(checkbox);
  expect(button).toBeEnabled();

  fireEvent.click(checkbox);
  expect(button).toBeDisabled();
})
