import { create } from "zustand";
import {
  DEFAULT_CITY,
  OPENING,
  type BookingDraft,
  type Caregiver,
  type ServiceKind,
} from "@/lib/care";

export type OraScreen = "find" | "book";

interface OraState {
  screen: OraScreen;
  city: string;
  service: ServiceKind;
  caregivers: Caregiver[];
  selectedId: string | null;
  hours: number;
  draft: BookingDraft | null;
  setScreen: (screen: OraScreen) => void;
  setService: (service: ServiceKind) => void;
  select: (id: string) => void;
  setHours: (hours: number) => void;
  confirm: () => void;
  reset: () => void;
}

const initial = {
  screen: "find" as OraScreen,
  city: DEFAULT_CITY,
  service: "companii" as ServiceKind,
  caregivers: OPENING,
  selectedId: null,
  hours: 3,
  draft: null,
};

export const useOraStore = create<OraState>((set, get) => ({
  ...initial,
  setScreen: (screen) => set({ screen }),
  setService: (service) => set({ service, selectedId: null }),
  select: (id) => set({ selectedId: id }),
  setHours: (hours) => set({ hours }),
  confirm: () => {
    const { selectedId, service, hours } = get();
    if (selectedId === null) return;
    set({
      draft: {
        caregiverId: selectedId,
        service,
        hours,
        date: "2026-09-15T10:00:00",
      },
      screen: "book",
    });
  },
  reset: () => set(initial),
}));
