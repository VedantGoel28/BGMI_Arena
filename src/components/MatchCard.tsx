import { type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import type { MatchMode } from '../types/matchMode';

interface MatchCardProps {
  mode: MatchMode;
}

const MatchCard = ({ mode }: MatchCardProps): ReactElement => {
  const navigate = useNavigate();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-xl">
      <img
        src={mode.imageUrl}
        alt={mode.modeName}
        className="aspect-video w-full object-cover"
      />
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-slate-900">{mode.modeName}</h3>
        <p className="mt-2 text-sm text-slate-600">Map: {mode.map}</p>
        <p className="mt-4 text-base font-semibold text-orange-600">Entry Fee: ₹{mode.entryFee}</p>
        <button
          type="button"
          onClick={() => navigate(`/match/${mode.id}`)}
          className="mt-6 w-full rounded-full bg-orange-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600"
        >
          Register
        </button>
      </div>
    </article>
  );
};

export default MatchCard;
