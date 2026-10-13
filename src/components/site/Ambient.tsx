const Ambient = () => (
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 grid-overlay opacity-60" />
    <div
      className="orb absolute -left-24 top-10 h-[420px] w-[420px] rounded-full blur-[120px]"
      style={{ background: "rgba(224,224,224,0.08)" }}
    />
    <div
      className="orb absolute right-[-8%] top-1/3 h-[460px] w-[460px] rounded-full blur-[130px]"
      style={{ background: "rgba(150,150,160,0.10)", animationDelay: "-7s" }}
    />
    <div
      className="orb absolute bottom-0 left-1/3 h-[380px] w-[380px] rounded-full blur-[130px]"
      style={{ background: "rgba(255,255,255,0.05)", animationDelay: "-13s" }}
    />
  </div>
);

export default Ambient;
