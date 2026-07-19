import { type ReactElement } from 'react';

const Footer = (): ReactElement => {
  return (
    <footer className="border-t border-slate-200 bg-slate-50/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-slate-600 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 BGMI Arena. Built for tournament registration workflows.</p>
        <p>UI-only starter frontend.</p>
      </div>
    </footer>
  );
};

export default Footer;
