import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import Sundae from "./Sundae";

test("Renders learn react", () => {
  render(<Sundae />);
  const header = screen.getByText("Hello");
  expect(header).toBeVisible();
});
