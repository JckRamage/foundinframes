export default function ReviewsLoading() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="mb-12 max-w-3xl animate-pulse">
        <div className="h-4 w-32 rounded bg-orange/20" />
        <div className="mt-4 h-14 w-64 rounded bg-ink/10" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="aspect-[2/3] rounded-2xl bg-ink/10" />
            <div className="mt-4 h-4 w-24 rounded bg-orange/20" />
            <div className="mt-2 h-6 w-full rounded bg-ink/10" />
          </div>
        ))}
      </div>
    </main>
  )
}
