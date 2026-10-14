/** Silver paper clip drawn in SVG, for pinning papers and polaroids. Decorative. */
export function PaperClip({ className }: { className?: string }) {
  const d = "M9 70V16a6 6 0 0 1 12 0v52a10 10 0 0 1-20 0V12A11 11 0 0 1 23 12v50";
  return (
    <svg className={className} viewBox="-2 -2 34 88" aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke="#8f959b" strokeWidth={3.2} strokeLinecap="round" />
      <path d={d} fill="none" stroke="#eceef0" strokeWidth={1.2} strokeLinecap="round" transform="translate(-.6 -.6)" />
    </svg>
  );
}
