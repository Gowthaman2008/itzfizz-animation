// Copy taken from the reference site.
const STATS = [
  { value: 58, label: 'Increase in pick up point use' },
  { value: 23, label: 'Decreased in customer phone calls' },
  { value: 27, label: 'Increase in pick up point use' },
  { value: 40, label: 'Decreased in customer phone calls' },
]

export default function Statistics() {
  return (
    <div className="relative z-10 grid grid-cols-2 gap-x-6 gap-y-6 self-start px-[6vw] pt-[5vh] md:grid-cols-4">
      {STATS.map((s, i) => (
        <div key={i} data-anim="stat" className="will-change-transform">
          <div
            className="font-sans font-extrabold leading-none tracking-tight text-[#0b0b0b]"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 4.75rem)' }}
          >
            <span data-anim="count" data-value={s.value}>{s.value}</span>
            <span className="text-[#0fb85a]">%</span>
          </div>
          <p className="mt-2 max-w-[18ch] text-sm font-medium leading-snug text-neutral-600 md:text-base">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
