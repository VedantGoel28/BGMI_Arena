import { type ReactElement } from 'react';
import Card from '../components/Card';

const AdminDashboard = (): ReactElement => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="Registrations" description="Review new signups and confirm them here." />
      <Card title="Matches" description="Manage slot availability and tournament status." />
    </div>
  );
};

export default AdminDashboard;
