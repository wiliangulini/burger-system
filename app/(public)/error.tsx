"use client";

import { ErrorState } from "@/components/ui/error-state";

type PublicErrorProps = {
  readonly reset: () => void;
};

export default function Error({ reset }: PublicErrorProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl justify-center px-6 py-12">
      <ErrorState onRetry={reset} />
    </div>
  );
}
