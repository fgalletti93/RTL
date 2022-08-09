import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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
    name: /i agree to terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", () => {
  render(<SummaryForm />);
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(termsAndConditions);
  expect(nullPopover).not.toBeInTheDocument();
});
