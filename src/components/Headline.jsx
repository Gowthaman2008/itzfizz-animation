const WORDS = ['WELCOME', 'ITZFIZZ']

/** One <span> per letter so each can be revealed at its own scroll position. */
export default function Headline() {
  return (
    <h1
      aria-label="Welcome Itzfizz"
      className="pointer-events-none absolute inset-y-0 z-20 m-0 flex items-center justify-center gap-[0.7em] font-sans font-extrabold uppercase leading-none text-[#04140a]"
      // Confined to [car start, car's final tail position] so the parked car never covers a letter.
      // Font size is capped so ~15em of text always fits that stretch.
      style={{
        left: '3%',
        right: 'calc(var(--car-w) + 6%)',
        fontSize: 'clamp(0.75rem, min(4.2vw, calc((100vw - var(--car-w) - 9vw) / 15)), 3.75rem)',
      }}
    >
      {WORDS.map((word) => (
        <span key={word} aria-hidden="true" className="flex gap-[0.22em]">
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
