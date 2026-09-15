export default function PageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden [contain:strict]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f7f0] via-[#f5f0e8] to-[#ede8dc]" />

      {/* Soft colour washes — no backdrop blur (blur on fixed layers kills scroll perf) */}
      <div className="absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full bg-[#e5771e]/10" />
      <div className="absolute -left-40 top-1/3 h-[360px] w-[360px] rounded-full bg-[#75c8ae]/12" />
      <div className="absolute -bottom-32 right-1/4 h-[440px] w-[440px] rounded-full bg-[#ffecb4]/25" />
    </div>
  )
}
