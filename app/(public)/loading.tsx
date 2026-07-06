import { Card } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-5xl justify-center px-6 py-12">
      <Card aria-live="polite" className="text-sm text-stone-600">
        Carregando...
      </Card>
    </div>
  );
}
