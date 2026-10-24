const CAR_SRC = `${import.meta.env.BASE_URL}images/car.svg`

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
      <div data-anim="car-body" className="h-full w-full">
        <img
          src={CAR_SRC}
          width="400"
          height="160"
          alt="Top-view sports car"
          decoding="async"
          fetchpriority="high"
          draggable="false"
          className="block h-full w-full select-none"
        />
      </div>
    </div>
  )
}
