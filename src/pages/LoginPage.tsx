import { type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const LoginPage = (): ReactElement => {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <Card title="Welcome back" description="Sign in to continue to your registration dashboard.">
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">
            <p className="font-medium text-slate-900">Demo sign-in</p>
            <p className="mt-1">Use the register page to create a placeholder account.</p>
          </div>
          <Button asChild className="w-full justify-center">
            <Link to="/dashboard">Continue to dashboard</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
