import { OPENING, available, quote, validHours } from "./care";

test("only verified Cluj caregivers matching the service are returned, best rating first", () => {
  expect(available(OPENING, "companii", "Cluj-Napoca").map((c) => c.id)).toEqual([
    "mioara",
    "ana",
    "ligia",
  ]);
  expect(available(OPENING, "plimbare", "Cluj-Napoca").map((c) => c.id)).toEqual([
    "mioara",
    "radu",
  ]);
  expect(available(OPENING, "cumparaturi", "Cluj-Napoca").map((c) => c.id)).toEqual([
    "vasile",
    "radu",
    "ligia",
  ]);
  expect(available(OPENING, "supraveghere", "Cluj-Napoca").map((c) => c.id)).toEqual([
    "vasile",
    "ana",
  ]);
});

test("shifts must stay between two and four hours", () => {
  expect(validHours(2)).toBe(true);
  expect(validHours(4)).toBe(true);
  expect(validHours(1)).toBe(false);
  expect(validHours(5)).toBe(false);
});

test("quote adds a rounded twelve percent platform commission", () => {
  expect(quote(50, 3)).toEqual({ subtotal: 150, commission: 18, total: 168 });
});
