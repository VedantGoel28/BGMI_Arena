import { type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import Button from './Button';

const Navbar = (): ReactElement => {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-slate-900">
          <div className="rounded-full bg-orange-500/10 p-2 text-orange-500">
            <Gamepad2 size={18} />
          </div>
          <div>
            <p className="text-base font-semibold">BGMI Arena</p>
            <p className="text-xs text-slate-500">Registration portal</p>
          </div>
        </Link>

        <nav className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/register">Register</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
