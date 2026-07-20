import { type ReactElement } from 'react';

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps): ReactElement => {
  return (
    <div className="grid gap-1 text-sm sm:grid-cols-[140px_minmax(0,1fr)]">
      <span className="font-medium text-slate-600">{label}</span>
      <span className="text-slate-900">{value}</span>
    </div>
  );
};

export default InfoRow;
