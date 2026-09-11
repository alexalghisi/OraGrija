import { useOraStore } from "./oraStore";

test("confirming a booking moves to the book screen with a draft", () => {
  useOraStore.getState().reset();
  useOraStore.getState().setService("companii");
  useOraStore.getState().select("mioara");
  useOraStore.getState().setHours(3);
  useOraStore.getState().confirm();
  expect(useOraStore.getState().screen).toBe("book");
  expect(useOraStore.getState().draft).toEqual({
    caregiverId: "mioara",
    service: "companii",
    hours: 3,
    date: "2026-09-15T10:00:00",
  });
  useOraStore.getState().reset();
  expect(useOraStore.getState().draft).toBeNull();
});
