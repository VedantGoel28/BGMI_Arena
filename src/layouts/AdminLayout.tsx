import { type ReactElement, type ReactNode } from 'react';
import { LayoutDashboard, Ticket, Swords } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
  children: ReactNode;
}

const navigation = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Registrations', to: '/admin/dashboard', icon: Ticket },
  { label: 'Assign Slot', to: '/admin/dashboard', icon: Swords },
];

const AdminLayout = ({ children }: AdminLayoutProps): ReactElement => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:px-8">
        <aside className="w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:w-72">
          <h2 className="px-3 text-lg font-semibold">Admin Panel</h2>
          <nav className="mt-4 space-y-2">
            {navigation.map(({ label, to, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
