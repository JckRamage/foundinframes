export default function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f7f0] via-[#f5f0e8] to-[#ede8dc]" />

      <div className="absolute -top-32 -right-24 h-[420px] w-[420px] rounded-full bg-[#e5771e]/15 blur-2xl" />
      <div className="absolute top-1/3 -left-40 h-[360px] w-[360px] rounded-full bg-[#75c8ae]/20 blur-2xl" />
      <div className="absolute -bottom-32 right-1/4 h-[440px] w-[440px] rounded-full bg-[#ffecb4]/40 blur-2xl" />

      <div className="absolute inset-0 retro-dot-grid opacity-20" />
    </div>
  )
}
