import { type ReactElement } from 'react';
import Card from '../components/Card';

const MatchRegistrationPage = (): ReactElement => {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <Card title="Match registration" description="This page will host the detailed registration experience for a specific match.">
        <p className="text-sm text-slate-600">Route param placeholder for the selected match.</p>
      </Card>
    </div>
  );
};

export default MatchRegistrationPage;
