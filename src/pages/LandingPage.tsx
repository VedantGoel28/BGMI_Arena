import { type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const LandingPage = (): ReactElement => {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-orange-50 via-white to-slate-100 p-8 shadow-sm sm:p-12">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
          <Trophy size={18} />
          BGMI Match Registration
        </div>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Register for tournaments in minutes.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          A polished starter frontend for managing BGMI registrations, match slots, and admin approvals.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/register">Create account</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Fast entry" description="Secure your slot quickly with a simple registration flow." />
        <Card title="Admin ready" description="Admin dashboard scaffolding is included for future moderation features." />
        <Card title="Modern stack" description="Built with React, TypeScript, Vite, React Router, and Tailwind CSS." />
      </div>
    </section>
  );
};

export default LandingPage;
