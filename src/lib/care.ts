export type ServiceKind = "companii" | "cumparaturi" | "plimbare" | "supraveghere";

export const SERVICE_LABELS: Record<ServiceKind, string> = {
  companii: "Companii",
  cumparaturi: "Cumpărături",
  plimbare: "Plimbare",
  supraveghere: "Supraveghere",
};

export type Caregiver = {
  id: string;
  name: string;
  city: string;
  verified: boolean;
  hourlyRate: number;
  services: ServiceKind[];
  rating: number;
  photo: string;
};

export type BookingDraft = {
  caregiverId: string;
  service: ServiceKind;
  hours: number;
  date: string;
};

export const COMMISSION_RATE = 0.12;
export const MIN_HOURS = 2;
export const MAX_HOURS = 4;
export const DEFAULT_CITY = "Cluj-Napoca";

export const OPENING: Caregiver[] = [
  {
    id: "mioara",
    name: "Mioara D.",
    city: "Cluj-Napoca",
    verified: true,
    hourlyRate: 45,
    services: ["companii", "plimbare"],
    rating: 4.9,
    photo: "caregivers/mioara.jpg",
  },
  {
    id: "vasile",
    name: "Vasile P.",
    city: "Cluj-Napoca",
    verified: true,
    hourlyRate: 50,
    services: ["cumparaturi", "supraveghere"],
    rating: 4.7,
    photo: "caregivers/vasile.jpg",
  },
  {
    id: "ana",
    name: "Ana T.",
    city: "Cluj-Napoca",
    verified: true,
    hourlyRate: 42,
    services: ["companii", "supraveghere"],
    rating: 4.6,
    photo: "caregivers/ana.jpg",
  },
  {
    id: "radu",
    name: "Radu S.",
    city: "Cluj-Napoca",
    verified: true,
    hourlyRate: 48,
    services: ["plimbare", "cumparaturi"],
    rating: 4.5,
    photo: "caregivers/radu.jpg",
  },
  {
    id: "ligia",
    name: "Ligia N.",
    city: "Cluj-Napoca",
    verified: true,
    hourlyRate: 40,
    services: ["companii", "cumparaturi"],
    rating: 4.4,
    photo: "caregivers/ligia.jpg",
  },
  {
    id: "elena",
    name: "Elena R.",
    city: "București",
    verified: true,
    hourlyRate: 55,
    services: ["companii", "cumparaturi", "plimbare"],
    rating: 4.8,
    photo: "caregivers/elena.jpg",
  },
  {
    id: "ion",
    name: "Ion M.",
    city: "Cluj-Napoca",
    verified: false,
    hourlyRate: 35,
    services: ["plimbare"],
    rating: 3.2,
    photo: "caregivers/ion.jpg",
  },
];

export function validHours(hours: number): boolean {
  return hours >= MIN_HOURS && hours <= MAX_HOURS;
}

export function available(
  caregivers: Caregiver[],
  service: ServiceKind,
  city: string,
): Caregiver[] {
  return caregivers
    .filter(
      (caregiver) =>
        caregiver.verified && caregiver.city === city && caregiver.services.includes(service),
    )
    .sort((a, b) => b.rating - a.rating || a.hourlyRate - b.hourlyRate);
}

export type Quote = {
  subtotal: number;
  commission: number;
  total: number;
};

export function quote(hourlyRate: number, hours: number): Quote {
  const subtotal = hourlyRate * hours;
  const commission = Math.round(subtotal * COMMISSION_RATE);
  return { subtotal, commission, total: subtotal + commission };
}
