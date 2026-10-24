const CAR_WEBP = `${import.meta.env.BASE_URL}images/bmw.webp`
const CAR_PNG = `${import.meta.env.BASE_URL}images/bmw.png`

/**
 * Outer element: moved horizontally by the scroll timeline (x only).
 * Inner element: used by the intro animation, so the two never fight over transforms.
 */
export default function Car() {
  return (
    <div
      data-anim="car"
      className="absolute left-0 top-1/2 z-30 will-change-transform"
      style={{ width: 'var(--car-w)', height: 'var(--car-h)', marginTop: 'calc(var(--car-h) / -2)' }}
    >
      <div data-anim="car-body" className="h-full w-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
        <picture>
          <source srcSet={CAR_WEBP} type="image/webp" />
          <img
            src={CAR_PNG}
            width="1193"
            height="579"
            alt="Top-view BMW M4 Sports Car"
            decoding="async"
            fetchpriority="high"
            draggable="false"
            className="block h-full w-full select-none object-contain"
          />
        </picture>
      </div>
    </div>
  )
}
