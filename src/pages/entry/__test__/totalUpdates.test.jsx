import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { rest } from "msw";
import { setupServer } from "msw/node";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

const server = setupServer(
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

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);

  const scoopSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, "1");
  expect(scoopSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, "2");
  expect(scoopSubtotal).toHaveTextContent("6.00");
});

test("update topping subtotal when toppings change", async () => {
  render(<Options optionType="toppings" />);

  const toppingSubtotal = screen.getByText("Toppings total: $", {
    exact: false,
  });
  expect(toppingSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  userEvent.click(cherriesCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");

  const hotFudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot fudge",
  });
  userEvent.click(hotFudgeCheckbox);
  expect(toppingSubtotal).toHaveTextContent("3.00");

  userEvent.click(hotFudgeCheckbox);
  expect(toppingSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total updates properly if scoop is added first", async () => {
    render(<OrderEntry />);

    const grandtotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    expect(grandtotal).toHaveTextContent("0.00");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandtotal).toHaveTextContent("4.00");

    const cherries = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherries);

    expect(grandtotal).toHaveTextContent(5.50)
  });

  test("grand total updates properly if topping is added first", async () => {
    render(<OrderEntry />);

    const grandtotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });
    const MMsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    userEvent.click(MMsCheckbox);
    expect(grandtotal).toHaveTextContent("1.50");

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandtotal).toHaveTextContent("5.50");
  });

  test("grand total updates properly if an item is removed", async () => {
    render(<OrderEntry />);
    const grandtotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");

    const MMsCheckbox = await screen.findByRole("checkbox", {
      name: "M&Ms",
    });
    userEvent.click(MMsCheckbox);

    userEvent.type(vanillaInput, "1");

    expect(grandtotal).toHaveTextContent("3.50");

    userEvent.click(MMsCheckbox);
    expect(grandtotal).toHaveTextContent('2.00')
  });
});
