'use client'

import { useEffect, useMemo, useState } from 'react'

type Person = { name: string; income: string }

const STORAGE_KEY = 'split:v1'

const DEFAULT_PEOPLE: Person[] = [
  { name: 'Me', income: '' },
  { name: 'Partner', income: '' },
]

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

/** Tolerates "$95,000", "95000.50", and empty input alike. */
function parseMoney(raw: string): number {
  const n = Number.parseFloat(raw.replace(/[^0-9.]/g, ''))
  return Number.isFinite(n) && n > 0 ? n : 0
}

/**
 * Largest-remainder apportionment: hand out whole cents by weight, then give
 * the leftover cents to the largest fractional parts. Guarantees the shares
 * add back up to the bill exactly, which naive per-person rounding does not.
 * Falls back to an even split when no incomes are entered yet.
 */
function splitCents(totalCents: number, weights: number[]): number[] {
  const n = weights.length
  if (n === 0) return []
  const sum = weights.reduce((a, b) => a + b, 0)
  const exact =
    sum > 0
      ? weights.map((w) => (totalCents * w) / sum)
      : weights.map(() => totalCents / n)

  const shares = exact.map(Math.floor)
  const leftover = totalCents - shares.reduce((a, b) => a + b, 0)
  const byFraction = exact
    .map((v, i) => ({ i, frac: v - Math.floor(v) }))
    .sort((a, b) => b.frac - a.frac || a.i - b.i)

  for (let k = 0; k < leftover; k++) shares[byFraction[k % n].i] += 1
  return shares
}

function encodeState(people: Person[], amount: string): string {
  const params = new URLSearchParams()
  for (const p of people) {
    params.append('n', p.name)
    params.append('i', p.income)
  }
  params.append('a', amount)
  return params.toString()
}

function decodeState(hash: string): { people: Person[]; amount: string } | null {
  if (!hash || hash.length < 2) return null
  const params = new URLSearchParams(hash.slice(1))
  const names = params.getAll('n')
  const incomes = params.getAll('i')
  if (names.length === 0 || names.length !== incomes.length) return null
  return {
    people: names.map((name, i) => ({ name, income: incomes[i] })),
    amount: params.get('a') ?? '',
  }
}

export default function Splitter() {
  const [people, setPeople] = useState<Person[]>(DEFAULT_PEOPLE)
  const [amount, setAmount] = useState('')
  const [loaded, setLoaded] = useState(false)
  const [copied, setCopied] = useState(false)

  // A shared link wins over whatever this device has saved; otherwise fall
  // back to the last-used incomes so they never need retyping.
  useEffect(() => {
    const shared = decodeState(window.location.hash)
    if (shared) {
      setPeople(shared.people)
      setAmount(shared.amount)
      setLoaded(true)
      return
    }
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as Person[]
        if (Array.isArray(parsed) && parsed.length > 0) setPeople(parsed)
      }
    } catch {
      // Corrupt or unavailable storage just means we start from defaults.
    }
    setLoaded(true)
  }, [])

  // Incomes persist; the bill amount deliberately does not.
  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(people))
    } catch {
      // Private browsing or a full quota — not worth surfacing.
    }
  }, [people, loaded])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(t)
  }, [copied])

  const result = useMemo(() => {
    const incomes = people.map((p) => parseMoney(p.income))
    const totalIncome = incomes.reduce((a, b) => a + b, 0)
    const bill = parseMoney(amount)
    const shares = splitCents(Math.round(bill * 100), incomes)
    return {
      bill,
      totalIncome,
      rows: people.map((p, i) => ({
        name: p.name.trim() || `Person ${i + 1}`,
        income: incomes[i],
        share: (shares[i] ?? 0) / 100,
        percent:
          totalIncome > 0
            ? (incomes[i] / totalIncome) * 100
            : 100 / people.length,
      })),
    }
  }, [people, amount])

  const update = (index: number, patch: Partial<Person>) =>
    setPeople((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...patch } : p)),
    )

  const addPerson = () =>
    setPeople((prev) => [...prev, { name: '', income: '' }])

  const removePerson = (index: number) =>
    setPeople((prev) => prev.filter((_, i) => i !== index))

  const copyLink = async () => {
    const url = `${window.location.origin}${window.location.pathname}#${encodeState(people, amount)}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      window.location.hash = encodeState(people, amount)
    }
    setCopied(true)
  }

  const inputClass =
    'border-border rounded-base bg-secondary-background text-foreground w-full border-2 p-3 text-base outline-none focus:ring-2 focus:ring-ring'

  return (
    <div className="text-foreground mx-auto w-[700px] max-w-full p-6 sm:p-8 md:p-16">
      <a
        href="/utilities/"
        className="font-base text-foreground/70 hover:text-foreground text-sm underline"
      >
        ← Utilities
      </a>

      <h1 className="font-heading mt-6 text-3xl sm:text-[44px]">Split</h1>
      <p className="font-base text-foreground/70 mt-2 text-base">
        Split a bill in proportion to income. Annual or monthly both work, as
        long as everyone uses the same one — only the ratio matters. Nothing you
        type leaves your browser.
      </p>

      <div className="mt-8 space-y-4">
        {people.map((person, i) => (
          <div key={i} className="flex items-center gap-3">
            <input
              className={inputClass}
              value={person.name}
              onChange={(e) => update(i, { name: e.target.value })}
              placeholder={`Person ${i + 1}`}
              aria-label={`Name for person ${i + 1}`}
            />
            <input
              className={inputClass}
              value={person.income}
              onChange={(e) => update(i, { income: e.target.value })}
              placeholder="Income"
              inputMode="decimal"
              aria-label={`Income for person ${i + 1}`}
            />
            <button
              type="button"
              onClick={() => removePerson(i)}
              disabled={people.length <= 2}
              aria-label={`Remove person ${i + 1}`}
              className="font-heading border-border rounded-base shrink-0 border-2 px-3 py-2 text-lg disabled:cursor-not-allowed disabled:opacity-30"
            >
              ×
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addPerson}
          className="font-base border-border rounded-base border-2 border-dashed px-4 py-2 text-sm"
        >
          + Add person
        </button>
      </div>

      <div className="mt-8">
        <label className="font-heading text-lg" htmlFor="bill">
          Bill amount
        </label>
        <input
          id="bill"
          className={`${inputClass} mt-2`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          inputMode="decimal"
        />
      </div>

      <div className="border-border shadow-shadow rounded-base bg-main text-main-foreground mt-8 border-2 p-5">
        {result.totalIncome === 0 && (
          <p className="font-base mb-4 text-sm">
            No incomes entered yet — splitting evenly for now.
          </p>
        )}

        <table className="w-full text-left">
          <thead>
            <tr className="font-heading text-sm">
              <th className="pb-2">Person</th>
              <th className="pb-2 text-right">Share</th>
              <th className="pb-2 text-right">Owes</th>
            </tr>
          </thead>
          <tbody className="font-base">
            {result.rows.map((row, i) => (
              <tr key={i} className="border-border/20 border-t">
                <td className="py-2 pr-2">{row.name}</td>
                <td className="py-2 text-right tabular-nums">
                  {row.percent.toFixed(1)}%
                </td>
                <td className="font-heading py-2 text-right text-lg tabular-nums">
                  {usd.format(row.share)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-border font-heading border-t-2">
              <td className="pt-2">Total</td>
              <td className="pt-2 text-right tabular-nums">100%</td>
              <td className="pt-2 text-right text-lg tabular-nums">
                {usd.format(result.bill)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <button
        type="button"
        onClick={copyLink}
        className="font-heading border-border shadow-shadow rounded-base bg-secondary-background hover:translate-x-boxShadowX hover:translate-y-boxShadowY mt-6 w-full border-2 p-3 transition-all hover:shadow-none"
      >
        {copied ? 'Link copied' : 'Copy shareable link'}
      </button>
      <p className="font-base text-foreground/70 mt-2 text-sm">
        The link carries the names and numbers in its URL so the page opens
        prefilled. It is never sent to a server, but treat it like the numbers
        themselves.
      </p>
    </div>
  )
}
