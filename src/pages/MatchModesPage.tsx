import { type ReactElement } from 'react';
import MatchCard from '../components/MatchCard';
import { matchModes } from '../data/matchModes';

const MatchModesPage = (): ReactElement => {
  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">Pick a mode</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Choose Your Match</h1>
        <p className="max-w-2xl text-base text-slate-600">
          Explore available BGMI modes and register for the one that fits your squad.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {matchModes.map((mode) => (
          <MatchCard key={mode.id} mode={mode} />
        ))}
      </div>
    </section>
  );
};

export default MatchModesPage;
