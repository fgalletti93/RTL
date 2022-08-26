import {render, screen } from '../../src/test-utils/testing-library-utils'
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../App";


const server = setupServer(
  rest.post("http://localhost:3030/order", (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 123456789 }));
  }),
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  })
);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

test("order phases for happy path", async () => {
  //render app
  render(<App setOrderPhase={jest.fn()}/>);
  //add scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "2");

  const cherries = await screen.findByRole("checkbox", { name: "Cherries" });
  userEvent.click(cherries);
  //find and click order button on entry page
  const grandtotal = await screen.findByRole("heading", { name: /grand total: \$/i });
  expect(grandtotal).toHaveTextContent("5.50");

  const orderBtn = screen.getByRole("button", { name: /order summary/i });
  userEvent.click(orderBtn);
  //accept terms and conditions and click to accept order
  const termsConditions = screen.getByRole("checkbox", {
    name: /i agree to terms and conditions/i,
  });
  userEvent.click(termsConditions);
  expect(termsConditions).toBeChecked();

  const acceptBtn = screen.getByRole("button", { name: /Confirm order/i });
  userEvent.click(acceptBtn);
  
  //confirm order number on confirmation page
  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();
  //click new order button on confirmation page
  const newOrderBtn = screen.getByRole("button", { name: /new order/i });
  userEvent.click(newOrderBtn);
  //check that subtotals have been reset
});
