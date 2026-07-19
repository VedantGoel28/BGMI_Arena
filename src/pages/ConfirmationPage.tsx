import { type ReactElement } from 'react';
import Card from '../components/Card';

const ConfirmationPage = (): ReactElement => {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6">
      <Card title="Registration confirmed" description="Your request has been received and is waiting for confirmation.">
        <p className="text-sm text-slate-600">This is a placeholder confirmation screen for the future flow.</p>
      </Card>
    </div>
  );
};

export default ConfirmationPage;
