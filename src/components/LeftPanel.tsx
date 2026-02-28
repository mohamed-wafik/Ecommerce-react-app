const LeftPanel = ({
  icon,
  badge,
  title,
  highlight,
  description,
  steps,
}: {
  icon: React.ReactNode;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  steps: { label: string; active: boolean }[];
}) => (
  <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700">
    {/* Decorative bg */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-indigo-900/40 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-violet-500/20 blur-2xl" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>

    {/* Logo */}
    <div className="relative z-10 flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </div>
      <span className="text-white font-bold text-lg tracking-tight">
        Mohamed Wafik
      </span>
    </div>

    {/* Center */}
    <div className="relative z-10">
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-white/80 text-xs font-medium">{badge}</span>
      </div>

      {/* Big icon */}
      <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-6">
        {icon}
      </div>

      <h2 className="text-white text-4xl font-bold leading-tight mb-4">
        {title}
        <br />
        <span className="text-violet-200 italic">{highlight}</span>
      </h2>
      <p className="text-white/55 text-sm leading-relaxed max-w-xs mb-10">
        {description}
      </p>

      {/* Progress steps */}
      <div className="flex flex-col gap-3">
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border ${
                step.active
                  ? "bg-white text-violet-700 border-white"
                  : "bg-white/10 text-white/40 border-white/15"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm ${step.active ? "text-white font-medium" : "text-white/40"}`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom */}
    <div className="relative z-10 flex items-center gap-5">
      {["Secure Checkout", "Free Returns", "24/7 Support"].map((badge) => (
        <div key={badge} className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-violet-300/60" />
          <span className="text-white/40 text-xs">{badge}</span>
        </div>
      ))}
    </div>
  </div>
);

export default LeftPanel;
