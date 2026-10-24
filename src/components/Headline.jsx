const WORDS = ['WELCOME', 'ITZFIZZ']

/** One <span> per letter so each can be revealed at its own scroll position. */
export default function Headline() {
  return (
    <h1
      aria-label="Welcome Itzfizz"
      className="pointer-events-none absolute inset-y-0 z-20 m-0 flex items-center justify-center gap-[0.55em] font-sans font-extrabold uppercase leading-none tracking-[0.05em] text-[#051329] whitespace-nowrap select-none"
      style={{
        left: 'clamp(1rem, 4.5vw, 3.5rem)',
        right: 'calc(var(--car-w) + clamp(1rem, 4.5vw, 3.5rem))',
        fontSize: 'clamp(1.1rem, min(4.4vw, calc((100vw - var(--car-w) - 10vw) / 10), calc(var(--road-h) * 0.52)), 3.85rem)',
      }}
    >
      {WORDS.map((word) => (
        <span key={word} aria-hidden="true" className="flex">
          {word.split('').map((char, i) => (
            <span key={i} data-anim="letter" className="inline-block will-change-transform">
              {char}
            </span>
          ))}
        </span>
      ))}
    </h1>
  )
}
