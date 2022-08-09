import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("displays image for each scoop from the server", () => {
  render(<Options optionType="scoops" />);

  //find the images
  const scoopImages = screen.getAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt test of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(['Chocolate scoop', 'Vanilla scoop'])
});
