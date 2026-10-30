'use client';

import { FormEvent, useState } from 'react';

function parseNumber(value: string) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  const parsedValue = Number(trimmedValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

export default function Home() {
  const [firstNumber, setFirstNumber] = useState('');
  const [secondNumber, setSecondNumber] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsedFirstNumber = parseNumber(firstNumber);
    const parsedSecondNumber = parseNumber(secondNumber);

    if (parsedFirstNumber === null || parsedSecondNumber === null) {
      setResult(null);
      setError(
        parsedFirstNumber === null && parsedSecondNumber === null
          ? 'Enter a valid first and second number.'
          : parsedFirstNumber === null
            ? 'Enter a valid first number.'
            : 'Enter a valid second number.'
      );
      return;
    }

    setError(null);
    setResult(parsedFirstNumber - parsedSecondNumber);
  }

  const firstNumberInvalid = Boolean(error) && parseNumber(firstNumber) === null;
  const secondNumberInvalid = Boolean(error) && parseNumber(secondNumber) === null;

  return (
    <main className="relative isolate flex min-h-screen items-center overflow-hidden px-5 py-10 sm:px-8">
      <div className="pointer-events-none absolute top-16 -left-28 -z-10 h-72 w-72 rounded-full bg-[var(--sun)]/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-8 -z-10 h-80 w-80 rounded-full bg-[var(--sky)]/40 blur-3xl" />

      <section className="mx-auto grid w-full max-w-5xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
        <header className="max-w-md">
          <div className="mb-8 flex items-center gap-3 text-sm font-semibold tracking-[0.18em] text-[var(--muted-ink)] uppercase">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] text-base text-[var(--paper)]">
              −
            </span>
            Plain math
          </div>
          <p className="mb-4 text-sm font-semibold tracking-[0.18em] text-[var(--accent)] uppercase">
            A quieter calculator
          </p>
          <h1 className="font-serif text-5xl leading-[0.95] tracking-[-0.045em] text-[var(--ink)] sm:text-7xl">
            Take one thing away.
          </h1>
          <p className="mt-6 max-w-sm text-lg leading-8 text-[var(--muted-ink)]">
            A focused subtraction tool for quick answers, clean thinking, and nothing else in the
            way.
          </p>
        </header>

        <div className="rounded-[2rem] border border-[var(--line)] bg-[var(--card)] p-6 shadow-[0_24px_70px_rgba(42,48,45,0.10)] sm:p-10">
          <div className="mb-10 flex items-start justify-between gap-4 border-b border-[var(--line)] pb-6">
            <div>
              <p className="text-sm font-semibold tracking-[0.16em] text-[var(--muted-ink)] uppercase">
                Subtraction
              </p>
              <p className="mt-2 text-sm text-[var(--muted-ink)]">
                Start with the larger number if you want a positive answer.
              </p>
            </div>
            <span className="rounded-full bg-[var(--soft-accent)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
              {result === null ? 'Ready' : 'Calculated'}
            </span>
          </div>

          <form className="space-y-8" onSubmit={handleSubmit} noValidate>
            <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--ink)]">
                  First number
                </span>
                <input
                  aria-describedby={error ? 'form-error' : undefined}
                  aria-invalid={firstNumberInvalid}
                  className="h-16 w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-5 text-2xl font-semibold text-[var(--ink)] transition outline-none placeholder:text-[var(--muted-ink)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/15"
                  inputMode="decimal"
                  onChange={(event) => setFirstNumber(event.target.value)}
                  placeholder="24"
                  type="text"
                  value={firstNumber}
                />
              </label>
              <span
                aria-hidden="true"
                className="hidden pb-4 text-3xl font-light text-[var(--muted-ink)] sm:block"
              >
                −
              </span>
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-[var(--ink)]">
                  Second number
                </span>
                <input
                  aria-describedby={error ? 'form-error' : undefined}
                  aria-invalid={secondNumberInvalid}
                  className="h-16 w-full rounded-2xl border border-[var(--line)] bg-[var(--paper)] px-5 text-2xl font-semibold text-[var(--ink)] transition outline-none placeholder:text-[var(--muted-ink)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/15"
                  inputMode="decimal"
                  onChange={(event) => setSecondNumber(event.target.value)}
                  placeholder="9"
                  type="text"
                  value={secondNumber}
                />
              </label>
            </div>

            <button
              className="h-14 w-full rounded-2xl bg-[var(--accent)] px-6 text-base font-bold text-white transition hover:bg-[var(--accent-hover)] focus:ring-4 focus:ring-[var(--accent)]/25 focus:outline-none active:translate-y-px"
              type="submit"
            >
              Subtract numbers
            </button>

            {error ? (
              <p
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                id="form-error"
                role="alert"
              >
                {error}
              </p>
            ) : null}

            <div
              aria-live="polite"
              className="rounded-2xl bg-[var(--ink)] px-5 py-6 text-[var(--paper)] sm:px-7"
            >
              <p className="text-xs font-semibold tracking-[0.18em] text-[var(--soft-ink)] uppercase">
                Your answer
              </p>
              <p className="mt-4 font-mono text-4xl font-medium tracking-[-0.06em] break-words sm:text-5xl">
                {result === null ? '—' : result}
              </p>
              <p className="mt-3 text-sm text-[var(--soft-ink)]">
                {result === null
                  ? 'Enter two numbers to reveal the difference.'
                  : `${firstNumber} minus ${secondNumber}`}
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
