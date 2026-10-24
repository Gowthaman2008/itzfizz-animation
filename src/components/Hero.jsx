import { useRef } from 'react'
import useScrollAnimation from '../hooks/useScrollAnimation.js'
import Road from './Road.jsx'
import Car from './Car.jsx'
import Headline from './Headline.jsx'
import Statistics from './Statistics.jsx'

/**
 * Layout: 3 grid rows — [brand] / [road lane] / [statistics].
 * The lane holds road, trail, headline and car so they share one coordinate space.
 * All animation lives in useScrollAnimation; React never re-renders while scrolling.
 */
export default function Hero() {
  const heroRef = useRef(null)
  useScrollAnimation(heroRef)

  return (
    <section ref={heroRef} className="hero relative grid w-full overflow-hidden" style={{ gridTemplateRows: '1fr auto 1fr' }}>
      <div data-anim="bg" className="absolute inset-0 bg-[#eef2f6]" />

      <header data-anim="brand" className="relative z-10 self-start px-[6vw] pt-6 font-sans text-xs font-semibold uppercase tracking-[0.35em] text-neutral-500">
        Itzfizz Digital
      </header>

      <div className="relative w-full" style={{ height: 'var(--road-h)' }}>
        <Road />
        <Headline />
        <Car />
      </div>

      <Statistics />

      <div data-anim="hint" className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center">
        <span data-anim="hint-text" className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.4em] text-neutral-500">
          Scroll ↓
        </span>
      </div>
    </section>
  )
}
