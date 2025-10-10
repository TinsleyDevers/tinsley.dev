// app/page.tsx

const links = [
  {
    label: "Email",
    href: "mailto:contact@tinsley.dev",
    display: "contact@tinsley.dev",
  },
  {
    label: "GitHub",
    href: "https://github.com/TinsleyDevers",
    display: "github.com/TinsleyDevers",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tinsley-devers-40820a1b9/",
    display: "linkedin.com/in/tinsley-devers-40820a1b9",
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 py-16 text-center text-slate-100">
      <div className="max-w-2xl space-y-10">
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-400">
            tinsley.dev
          </p>
          <h1 className="text-4xl font-semibold sm:text-5xl">Tinsley Devers</h1>
          <p className="text-lg text-slate-300 sm:text-xl">
            I&apos;m rebuilding my site to make it lighter, faster, and more useful.
            Check back soon for the refreshed experience.
          </p>
        </div>

        <section className="space-y-4 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 shadow-xl shadow-slate-950/40">
          <h2 className="text-sm font-medium uppercase tracking-[0.35em] text-slate-400">
            Stay in touch
          </h2>
          <ul className="space-y-3 text-left text-base sm:text-lg">
            {links.map((link) => (
              <li key={link.label} className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-semibold text-slate-200">{link.label}</span>
                <a
                  href={link.href}
                  className="text-slate-300 transition hover:text-white focus:outline-none focus-visible:text-white"
                >
                  {link.display}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-sm text-slate-500">
          In the meantime, you can still reach me for collaborations, freelance
          work, or a friendly hello via the channels above.
        </p>
      </div>
    </main>
  );
}
