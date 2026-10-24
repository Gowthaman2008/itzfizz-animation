/** Static road + the scroll-scaled green trail. The trail's geometry is set by the animation hook. */
export default function Road() {
  return (
    <div data-anim="road" className="road-surface absolute inset-0 z-10 overflow-hidden">
      <div className="road-dashes absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2" />
      <div data-anim="trail" className="trail-fill absolute left-0 top-0 h-full" />
    </div>
  )
}
