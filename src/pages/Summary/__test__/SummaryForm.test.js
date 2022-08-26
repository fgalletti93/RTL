import { render, screen, waitFor } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import SummaryForm from "../SummaryForm";

test("Should check checkbox enables and disabled button", () => {
  render(<SummaryForm setOrderPhase={jest.fn()} />);
  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  expect(checkbox).not.toBeChecked();
  expect(button).toBeDisabled();
});

test("Enables button on first click and disables on second", () => {
  render(<SummaryForm setOrderPhase={jest.fn()} />);
  const checkbox = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  const button = screen.getByRole("button", { name: "Confirm order" });

  userEvent.click(checkbox);
  expect(button).toBeEnabled();

  userEvent.click(checkbox);
  expect(button).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm setOrderPhase={jest.fn()} />);
  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();

  const termsAndConditions = screen.getByText(/terms and conditions/i);
  userEvent.hover(termsAndConditions);

  const popover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(popover).toBeInTheDocument();
  userEvent.unhover(termsAndConditions);

  await waitFor(() => {
    expect(nullPopover).not.toBeInTheDocument();
  });
});
