import { type ReactElement } from 'react';
import Card from '../components/Card';

const AdminLogin = (): ReactElement => {
  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6">
      <Card title="Admin access" description="Use this placeholder page while the admin auth flow is being built.">
        <p className="text-sm text-slate-600">Secure login will be added later.</p>
      </Card>
    </div>
  );
};

export default AdminLogin;
