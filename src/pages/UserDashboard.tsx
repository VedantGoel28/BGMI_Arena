import { type ReactElement } from 'react';
import Card from '../components/Card';

const UserDashboard = (): ReactElement => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card title="Upcoming matches" description="Your registered matches will appear here." />
      <Card title="Account summary" description="Track payments and status updates in one place." />
    </div>
  );
};

export default UserDashboard;
