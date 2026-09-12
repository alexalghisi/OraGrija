import { Button } from "@/components/ui/button";
import { useOraStore } from "@/store/oraStore";

export function WindowToolbar() {
  const screen = useOraStore((state) => state.screen);
  const setScreen = useOraStore((state) => state.setScreen);
  const reset = useOraStore((state) => state.reset);

  return (
    <header className="flex shrink-0 items-center gap-3 border-b border-black/5 bg-titlebar px-3 py-2">
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="h-3 w-3 rounded-full bg-[#FF5F57] ring-1 ring-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#FEBC2E] ring-1 ring-black/10" />
        <span className="h-3 w-3 rounded-full bg-[#28C840] ring-1 ring-black/10" />
      </div>
      <h1 className="flex-1 text-center text-[13px] font-semibold tracking-tight text-foreground/80">
        OraGrija
      </h1>
      <div className="flex items-center gap-1">
        <Button
          variant={screen === "find" ? "default" : "outline"}
          size="sm"
          className="h-7 rounded-md px-2 text-[12px]"
          onClick={() => setScreen("find")}
          data-testid="nav-find"
        >
          Găsește
        </Button>
        <Button
          variant={screen === "book" ? "default" : "outline"}
          size="sm"
          className="h-7 rounded-md px-2 text-[12px]"
          onClick={() => setScreen("book")}
          data-testid="nav-book"
        >
          Rezervare
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-md px-2 text-[12px]"
          onClick={reset}
          data-testid="button-reset"
        >
          Reset
        </Button>
      </div>
    </header>
  );
}
