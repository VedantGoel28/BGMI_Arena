import { type ReactElement, type ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps): ReactElement => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="mx-auto flex min-h-[70vh] max-w-7xl flex-col px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
