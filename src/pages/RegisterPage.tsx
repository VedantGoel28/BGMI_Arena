import { type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const RegisterPage = (): ReactElement => {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <Card title="Create account" description="Register to start joining BGMI matches and manage your entries.">
        <div className="space-y-4">
          <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
            Registration form placeholder. Add your auth flow later.
          </div>
          <Button asChild className="w-full justify-center">
            <Link to="/confirmation">Submit</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
