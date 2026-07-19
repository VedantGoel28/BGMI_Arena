import { type ReactElement, type ReactNode } from 'react';

interface CardProps {
  title: string;
  description: string;
  children?: ReactNode;
}

const Card = ({ title, description, children }: CardProps): ReactElement => {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      {children ? <div className="mt-6">{children}</div> : null}
    </article>
  );
};

export default Card;
