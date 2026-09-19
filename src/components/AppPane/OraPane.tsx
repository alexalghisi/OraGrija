import { Button } from "@/components/ui/button";
import { SERVICE_LABELS, available, quote, type ServiceKind } from "@/lib/care";
import { useOraStore } from "@/store/oraStore";

const SERVICES: ServiceKind[] = ["companii", "cumparaturi", "plimbare", "supraveghere"];
const HOUR_OPTIONS = [2, 3, 4];

function photoUrl(photo: string): string {
  return `${import.meta.env.BASE_URL}${photo}`;
}

export function OraPane() {
  const screen = useOraStore((state) => state.screen);
  const city = useOraStore((state) => state.city);
  const service = useOraStore((state) => state.service);
  const caregivers = useOraStore((state) => state.caregivers);
  const selectedId = useOraStore((state) => state.selectedId);
  const hours = useOraStore((state) => state.hours);
  const draft = useOraStore((state) => state.draft);
  const setService = useOraStore((state) => state.setService);
  const select = useOraStore((state) => state.select);
  const setHours = useOraStore((state) => state.setHours);
  const confirm = useOraStore((state) => state.confirm);

  const matches = available(caregivers, service, city);
  const selected = caregivers.find((caregiver) => caregiver.id === selectedId);
  const pricing = selected ? quote(selected.hourlyRate, hours) : null;

  if (screen === "book" && draft !== null && selected) {
    const booked = quote(selected.hourlyRate, draft.hours);
    return (
      <div
        className="flex min-h-0 flex-1 flex-col justify-center gap-4 p-8 animate-in fade-in duration-300"
        data-testid="booking-summary"
      >
        <img
          src={photoUrl(selected.photo)}
          alt=""
          width={72}
          height={72}
          className="h-[72px] w-[72px] rounded-full object-cover"
        />
        <p className="text-[13px] text-muted-foreground">
          {SERVICE_LABELS[draft.service]} · {String(draft.hours)} ore · {city}
        </p>
        <p className="text-[28px] font-semibold tracking-tight">{selected.name}</p>
        <p className="text-[15px]" data-testid="booking-total">
          {String(booked.total)} RON total ({String(booked.subtotal)} + {String(booked.commission)}{" "}
          comision)
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex flex-wrap gap-1 border-b border-border px-4 py-2">
        {SERVICES.map((kind) => (
          <Button
            key={kind}
            variant={service === kind ? "default" : "outline"}
            size="sm"
            className="h-8 rounded-full px-3 text-[12px]"
            data-testid={`filter-${kind}`}
            onClick={() => setService(kind)}
          >
            {SERVICE_LABELS[kind]}
          </Button>
        ))}
      </div>
      <ul className="min-h-0 flex-1 overflow-auto p-3">
        {matches.map((caregiver) => (
          <li
            key={caregiver.id}
            data-testid={`caregiver-${caregiver.id}`}
            className="flex items-center justify-between border-b border-border/70 py-3 text-[14px] transition-colors hover:bg-secondary/80"
          >
            <button
              type="button"
              className="flex min-w-0 flex-1 items-center gap-3 text-left"
              onClick={() => select(caregiver.id)}
            >
              <img
                src={photoUrl(caregiver.photo)}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 shrink-0 rounded-full object-cover"
              />
              <span className="min-w-0">
                <span className="block truncate">
                  {caregiver.name} · {String(caregiver.rating)} ★
                </span>
                <span className="block truncate text-[12px] text-muted-foreground">
                  {caregiver.services.map((kind) => SERVICE_LABELS[kind]).join(", ")}
                </span>
              </span>
            </button>
            <span className="text-[12px] text-muted-foreground">
              {String(caregiver.hourlyRate)} RON/oră
              {selectedId === caregiver.id ? " · selectat" : ""}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 border-t border-border px-4 py-3">
        {HOUR_OPTIONS.map((option) => (
          <Button
            key={option}
            variant={hours === option ? "default" : "outline"}
            size="sm"
            className="h-8 rounded-full px-3 text-[12px]"
            data-testid={`hours-${String(option)}`}
            onClick={() => setHours(option)}
          >
            {String(option)}h
          </Button>
        ))}
        <Button
          size="sm"
          className="ml-auto h-8 rounded-full px-3 text-[12px]"
          data-testid="confirm-booking"
          onClick={confirm}
          disabled={selectedId === null}
        >
          Rezervă
        </Button>
        {pricing !== null ? (
          <span className="text-[12px] text-muted-foreground" data-testid="quote-preview">
            {String(pricing.total)} RON
          </span>
        ) : null}
      </div>
    </div>
  );
}
