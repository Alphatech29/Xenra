"use client";

export default function FinanceHero() {
  return (
    <section className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Top Row */}
        <div className="mb-12 flex items-center justify-between">
          <span className="rounded-full border px-4 py-1 text-sm font-medium">
            ABOUT SOLDI
          </span>

          <button className="rounded-xl bg-lime-400 px-6 py-3 text-sm font-semibold text-black shadow transition hover:scale-105">
            Learn More
          </button>
        </div>

        {/* Title */}
        <h1 className="mb-14 max-w-2xl text-4xl font-extrabold leading-tight">
          Smart Money Transfer Solutions <br />
          For Your Business
        </h1>

        {/* Main Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[260px_320px_1fr] items-center">

          {/* Left Menu */}
          <div className="space-y-4">
            {[
              { title: "Financial Revenue", active: true },
              { title: "Private Loan" },
              { title: "Online Banking" },
              { title: "Transfer of Funds" },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex items-center justify-between rounded-2xl px-6 py-5 transition cursor-pointer
                  ${
                    item.active
                      ? "bg-emerald-900 text-white shadow-lg"
                      : "bg-lime-100 hover:bg-lime-200"
                  }
                `}
              >
                <span className="font-semibold">{item.title}</span>

                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full
                    ${
                      item.active
                        ? "bg-lime-400 text-black"
                        : "bg-white"
                    }
                  `}
                >
                  ↗
                </span>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className="flex justify-center">
            <div className="h-105 w-[320px] overflow-hidden rounded-3xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1605902711622-cfb43c44367f"
                alt="Online payment"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="rounded-3xl bg-[#F2F6FF] p-10">
            <h3 className="mb-4 text-xl font-bold">
              Receive Early Payments Within 24 Hours
            </h3>

            <p className="mb-8 text-sm text-gray-600 max-w-md">
              We would like to confirm that the money transfer has been initiated.
              The funds are being processed through our secure payment system.
            </p>

            <ul className="space-y-4">
              {[
                "Manage All Your Credit Cards in One Place",
                "Smart Spending Insights",
                "Goal-Oriented Financial Planning",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 rounded-xl bg-white px-5 py-4 shadow-sm"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-400 font-bold">
                    ✓
                  </span>
                  <span className="text-sm font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
