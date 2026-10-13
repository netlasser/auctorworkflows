const SiteFooter = () => (
  <footer className="border-t border-border px-[22px] py-12">
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 text-center">
      <a href="#top" className="transition-opacity hover:opacity-80">
        <img src="/favicon.png" alt="Auctor Workflows logo" className="h-11 w-11 object-contain sm:h-12 sm:w-12" />
      </a>
      <p className="text-xs text-muted-ink">Built with ❤ in Addis Ababa, Ethiopia · Powered by n8n & AI</p>
      <p className="text-xs text-muted-ink">© 2026 Auctor Workflows · All rights reserved</p>
    </div>
  </footer>
);

export default SiteFooter;
