const WORDS = ['WELCOME', 'ITZFIZZ']

/** One <span> per letter so each can be revealed at its own scroll position. */
export default function Headline() {
  return (
    <h1
      aria-label="Welcome Itzfizz"
      className="pointer-events-none absolute inset-y-0 z-20 m-0 flex items-center justify-center gap-[0.55em] font-sans font-extrabold uppercase leading-none tracking-[0.06em] text-[#04140a] whitespace-nowrap select-none"
      style={{
        left: 'clamp(1.5rem, 5vw, 4rem)',
        right: 'calc(var(--car-w) + clamp(1.5rem, 5vw, 4rem))',
        fontSize: 'clamp(0.85rem, min(3.2vw, calc((100vw - var(--car-w) - 12vw) / 12), calc(var(--road-h) * 0.42)), 2.65rem)',
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
