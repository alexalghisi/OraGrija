import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { OraPane } from "./OraPane";
import { useOraStore } from "@/store/oraStore";

beforeEach(() => {
  useOraStore.getState().reset();
});

test("Companii shows Mioara; Cumpărături shows Vasile; select plus 3h quotes 151 and confirm books", async () => {
  const user = userEvent.setup();
  render(<OraPane />);

  expect(screen.getByTestId("filter-companii")).toBeInTheDocument();
  expect(screen.getByTestId("caregiver-mioara")).toBeInTheDocument();

  await user.click(screen.getByTestId("filter-cumparaturi"));
  expect(screen.getByTestId("caregiver-vasile")).toBeInTheDocument();
  expect(screen.queryByTestId("caregiver-mioara")).not.toBeInTheDocument();

  await user.click(screen.getByTestId("filter-companii"));
  await user.click(within(screen.getByTestId("caregiver-mioara")).getByRole("button"));
  await user.click(screen.getByTestId("hours-3"));
  expect(screen.getByTestId("quote-preview")).toHaveTextContent("151");

  await user.click(screen.getByTestId("confirm-booking"));
  expect(screen.getByTestId("booking-summary")).toBeInTheDocument();
  expect(screen.getByTestId("booking-total")).toHaveTextContent("151 RON");
});
