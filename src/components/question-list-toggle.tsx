import type { Ref } from "react";
import { List } from "lucide-react";
import type { Locale } from "@/content/types";
import { text } from "@/lib/i18n";
import { IconButton } from "@/components/controls";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";

export function QuestionListToggle({
  locale,
  open,
  onToggle,
  toggleRef,
}: {
  locale: Locale;
  open: boolean;
  onToggle: () => void;
  toggleRef: Ref<HTMLButtonElement>;
}) {
  return (
    <>
      <IconButton
        ref={toggleRef}
        className="desktop-list-toggle"
        label={text(
          locale,
          open ? "Sembunyikan daftar soal" : "Tampilkan daftar soal",
          open ? "Hide question list" : "Show question list",
        )}
        aria-expanded={open}
        aria-controls="question-sidebar"
        onClick={onToggle}
      >
        <List className="size-[18px]" />
      </IconButton>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="mobile-list-button">
          <List />
          {text(locale, "Daftar soal", "Questions")}
        </Button>
      </SheetTrigger>
    </>
  );
}
