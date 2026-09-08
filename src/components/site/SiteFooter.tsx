import logo from "@/assets/bz-logo-transparent.png";

const SiteFooter = () => (
  <footer className="border-t border-border px-[22px] py-12">
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 text-center">
      <img src={logo} alt="Biruke Zeckariyas logo" className="h-[280px] w-[280px] object-contain" />
      <p className="text-xs text-muted-ink">Built with ❤ in Addis Ababa, Ethiopia · Powered by n8n & AI</p>
      <p className="text-xs text-muted-ink">© 2026 Biruke Zeckariyas · All rights reserved</p>
    </div>
  </footer>
);

export default SiteFooter;
