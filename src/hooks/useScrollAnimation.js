import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })

/** Tweak these to change the feel of the animation. */
export const ANIMATION_CONFIG = {
  scrollScreensDesktop: 3.5, // pinned scroll distance, in viewport heights
  scrollScreensMobile: 2.2,
  mobileBreakpoint: 768, // px
  scrub: 0.8, // seconds of smoothing between scroll and animation
  edgePadding: 0.03, // car start/end inset, as a fraction of hero width
  statDuration: 0.12, // fraction of the master timeline
  countDuration: 0.14,
}

/**
 * Builds ONE master timeline (duration 1 == full scroll distance) driven by a single pinned
 * ScrollTrigger. Car, trail, letters, stats and counters are all children of it, so they
 * can never drift out of sync, and scrolling up reverses everything automatically.
 *
 * Elements are found via data-anim attributes inside the hero, so components stay presentational.
 */
export default function useScrollAnimation(heroRef) {
  useLayoutEffect(() => {
    const hero = heroRef.current
    if (!hero) return undefined

    const cfg = ANIMATION_CONFIG
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const q = (name) => hero.querySelector(`[data-anim="${name}"]`)
    const qa = (name) => gsap.utils.toArray(hero.querySelectorAll(`[data-anim="${name}"]`))
    let ctx

    const build = () => {
      ctx = gsap.context(() => {
        const car = q('car')
        const trail = q('trail')
        const letters = qa('letter')
        const stats = qa('stat')

        // ---- Geometry (measured once per build, never per scroll tick) ----
        const W = hero.clientWidth
        const carW = car.offsetWidth
        const startX = W * cfg.edgePadding
        const travel = Math.max(W - carW - startX * 2, 1) // distance the car drives
        const carCenter0 = startX + carW / 2
        const heroLeft = hero.getBoundingClientRect().left
        const centerOf = (el) => {
          const r = el.getBoundingClientRect()
          return r.left + r.width / 2 - heroLeft
        }
        // Timeline progress (0..1) at which the car's centre is above x.
        const progressAt = (x) => (x - carCenter0) / travel

        gsap.set(car, { x: startX })
        // The trail spans [car centre at start -> car centre at end]; scaleX 0 -> 1 keeps its
        // right edge glued to the car's centre because both move linearly over the same progress.
        gsap.set(trail, { x: carCenter0, width: travel, scaleX: 0, transformOrigin: '0% 50%' })

        if (reduced) {
          // Respect reduced motion: show the final state, no pin, no scrub.
          gsap.set(car, { x: startX + travel })
          gsap.set(trail, { scaleX: 1 })
          return
        }

        // ---- Intro (time-based, chrome only: the car's drive stays scroll-driven) ----
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from(q('bg'), { opacity: 0, duration: 0.6 }, 0)
          .from(q('road'), { opacity: 0, y: 16, duration: 0.8 }, 0.15)
          .from(q('car-body'), { opacity: 0, y: -14, scale: 0.95, duration: 0.9 }, 0.45)
          .from(q('brand'), { opacity: 0, y: -8, duration: 0.7 }, 0.6)
          .from(q('hint'), { opacity: 0, y: 8, duration: 0.7 }, 1.0)

        // ---- Master scroll timeline ----
        const screens = window.innerWidth < cfg.mobileBreakpoint ? cfg.scrollScreensMobile : cfg.scrollScreensDesktop
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: () => `+=${Math.round(window.innerHeight * screens)}`,
            pin: true,
            scrub: cfg.scrub,
            anticipatePin: 1,
          },
        })

        tl.fromTo(car, { x: startX }, { x: startX + travel, duration: 1 }, 0)
        tl.fromTo(trail, { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
        tl.fromTo(q('hint-text'), { opacity: 1 }, { opacity: 0, duration: 0.06 }, 0)

        // Letters: the headline sits inside the stretch the car drives over (see Headline.jsx), so
        // every letter is uncovered by the car's tail before the car parks. A letter starts to
        // fade/rise the moment the tail reaches its left edge, tied to the car's real position.
        const tailOffset = carW * 0.05 // the car art starts ~5% in from the image's left edge
        const letterDur = 0.07
        letters.forEach((el) => {
          const left = el.getBoundingClientRect().left - heroLeft
          const at = gsap.utils.clamp(0, 1 - letterDur, (left - startX - tailOffset) / travel)
          tl.fromTo(el, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: letterDur, ease: 'power2.out' }, at)
        })

        // Stats: revealed when the car passes the column's centre; numbers count up with scroll.
        // On narrow screens the stats wrap into a 2x2 grid where rows share a column, so they are
        // staggered by index instead (0.15, 0.35, 0.55, 0.75) to keep four distinct stages.
        const narrow = window.innerWidth < cfg.mobileBreakpoint
        stats.forEach((stat, i) => {
          const at = narrow
            ? 0.15 + i * 0.2
            : gsap.utils.clamp(0.04, 1 - cfg.countDuration, progressAt(centerOf(stat)))
          tl.fromTo(stat, { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: cfg.statDuration, ease: 'power2.out' }, at)

          const numEl = stat.querySelector('[data-anim="count"]')
          const state = { v: 0 }
          numEl.textContent = '0'
          tl.fromTo(
            state,
            { v: 0 },
            {
              v: Number(numEl.dataset.value),
              duration: cfg.countDuration,
              onUpdate: () => {
                numEl.textContent = Math.round(state.v)
              },
            },
            at,
          )
        })
      }, hero)
    }

    build()

    // Positions are measured at build time, so rebuild when the width changes.
    // Height-only changes (mobile URL bar) are ignored on purpose.
    let lastWidth = window.innerWidth
    let timer
    const onResize = () => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (window.innerWidth === lastWidth) return
        lastWidth = window.innerWidth
        ctx.revert()
        build()
        ScrollTrigger.refresh()
      }, 200)
    }
    window.addEventListener('resize', onResize)

    let disposed = false
    document.fonts?.ready.then(() => {
      if (disposed) return
      ctx.revert()
      build()
      ScrollTrigger.refresh()
    })

    return () => {
      disposed = true
      clearTimeout(timer)
      window.removeEventListener('resize', onResize)
      ctx.revert() // kills tweens + ScrollTriggers and removes the pin
    }
  }, [heroRef])
}
