export default function PageBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f7f0] via-[#f5f0e8] to-[#ede8dc]" />

      <div className="retro-blob absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-[#e5771e]/20 blur-3xl" />
      <div className="retro-blob retro-blob-delay-1 absolute top-1/3 -left-40 h-[440px] w-[440px] rounded-full bg-[#75c8ae]/25 blur-3xl" />
      <div className="retro-blob retro-blob-delay-2 absolute -bottom-32 right-1/4 h-[560px] w-[560px] rounded-full bg-[#ffecb4]/50 blur-3xl" />
      <div className="retro-blob retro-blob-delay-3 absolute top-2/3 left-1/3 h-72 w-72 rounded-full bg-[#f4a127]/15 blur-3xl" />

      <div className="absolute inset-0 retro-dot-grid opacity-[0.35]" />
    </div>
  )
}
