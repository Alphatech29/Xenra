import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Background gradient blobs */}
      <div className="pointer-events-none absolute -left-50 top-50 h-125 w-125 rounded-full bg-orange-200/50 blur-[120px]" />
      <div className="pointer-events-none absolute -right-50 top-37.5 h-130 w-130 rounded-full bg-indigo-300/50 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-32 text-center">
        {/* Top badge */}
        <div className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm text-indigo-600">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white">
            NEW
          </span>
          <span className="font-medium">International Bills & eSIM</span>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-white">
            →
          </span>
        </div>

        {/* Main heading */}
        <h1 className="mx-auto max-w-5xl text-3xl font-semibold leading-tight text-slate-900 md:text-5xl">
          Power your finances with virtual dollar cards, gift cards, and{" "}
          <span className="font-semibold text-indigo-500">
            next-gen digital payment solutions
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
          Xenra is a trusted digital finance platform that enables virtual
          dollar cards, eSIM purchases, gift card trading, and instant bill
          payments.
        </p>

        {/* CTA button */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/auth/register"
            className="rounded-full bg-[#0a335c] px-14 py-4 text-base font-medium text-white transition-all duration-300 hover:scale-105 hover:bg-[#063f79]"
          >
            Get started
          </Link>
        </div>
      </div>
    </section>
  );
}
