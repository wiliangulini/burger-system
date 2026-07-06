import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type ErrorStateProps = {
  readonly title?: string;
  readonly description?: string;
  readonly onRetry?: () => void;
};

export function ErrorState({
  title = "Algo deu errado",
  description = "Não foi possível carregar esta página. Tente novamente.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="mx-auto flex max-w-md flex-col items-start gap-4 text-left">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-stone-950">{title}</h2>
        <p className="text-sm text-stone-600">{description}</p>
      </div>

      {onRetry ? (
        <Button onClick={onRetry} variant="secondary">
          Tentar novamente
        </Button>
      ) : null}
    </Card>
  );
}
