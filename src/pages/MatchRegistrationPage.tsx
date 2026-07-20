import { type FormEvent, type ReactElement, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import InfoRow from '../components/InfoRow';
import Button from '../components/Button';
import type { MatchMode } from '../types/matchMode';
import type { RegistrationFormData } from '../types';
import { matchModes } from '../data/matchModes';

const dummyUser = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  mobileNumber: '9876543210',
};

const initialFormData: RegistrationFormData = {
  ign: '',
  uid: '',
  level: 1,
};

const MatchRegistrationPage = (): ReactElement => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedMode = useMemo<MatchMode | undefined>(() => {
    return matchModes.find((mode) => mode.id === matchId);
  }, [matchId]);

  const validationErrors = useMemo(() => {
    const nextErrors: Partial<Record<keyof RegistrationFormData, string>> = {};
    const ignValue = formData.ign?.trim() ?? '';
    const uidValue = formData.uid?.trim() ?? '';

    if (!ignValue && !uidValue) {
      nextErrors.ign = 'Enter your IGN or UID to continue.';
      nextErrors.uid = 'Enter your IGN or UID to continue.';
    }

    if (uidValue && !/^\d+$/.test(uidValue)) {
      nextErrors.uid = 'UID must contain only numbers.';
    }

    if (!Number.isFinite(formData.level) || formData.level < 1 || formData.level > 100) {
      nextErrors.level = 'Enter a valid BGMI level between 1 and 100.';
    }

    return nextErrors;
  }, [formData]);

  const isFormValid = selectedMode !== undefined && Object.keys(validationErrors).length === 0;

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setErrors(validationErrors);

    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    window.setTimeout(() => {
      console.log('Match registration submitted', {
        user: dummyUser,
        match: selectedMode,
        registration: formData,
      });
      setIsSubmitting(false);
      navigate('/confirmation');
    }, 700);
  };

  const handleChange = (field: keyof RegistrationFormData, value: string): void => {
    setFormData((current: RegistrationFormData) => ({
      ...current,
      [field]: field === 'level' ? Number(value) : value,
    }));

    if (field === 'ign' || field === 'uid') {
      setErrors((current) => ({ ...current, ign: undefined, uid: undefined }));
    } else {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
  };

  if (!selectedMode) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <Card title="Match not found" description="The selected match mode could not be loaded.">
          <p className="text-sm text-slate-600">Please go back and select a valid match.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <Card title="Match registration" description="Complete your registration details before paying for the match.">
          <div className="space-y-8">
            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-semibold text-slate-900">Your Details</h2>
              <div className="mt-4 space-y-3">
                <InfoRow label="Full Name" value={dummyUser.name} />
                <InfoRow label="Email" value={dummyUser.email} />
                <InfoRow label="Mobile Number" value={dummyUser.mobileNumber} />
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-semibold text-slate-900">Match Details</h2>
              <div className="mt-4 space-y-3">
                <InfoRow label="Mode" value={selectedMode.modeName} />
                <InfoRow label="Map" value={selectedMode.map} />
                <InfoRow label="Entry Fee" value={`₹${selectedMode.entryFee}`} />
              </div>
            </section>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">Game Details</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="ign" className="block text-sm font-medium text-slate-700">
                      BGMI In-Game Name (IGN)
                    </label>
                    <input
                      id="ign"
                      type="text"
                      value={formData.ign}
                      onChange={(event) => handleChange('ign', event.target.value)}
                      placeholder="Enter IGN"
                      className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition ${errors.ign ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'}`}
                    />
                    {errors.ign ? <p className="text-xs text-red-500">{errors.ign}</p> : null}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="uid" className="block text-sm font-medium text-slate-700">
                      BGMI UID
                    </label>
                    <input
                      id="uid"
                      type="text"
                      inputMode="numeric"
                      value={formData.uid}
                      onChange={(event) => handleChange('uid', event.target.value)}
                      placeholder="Enter numeric UID"
                      className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition ${errors.uid ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'}`}
                    />
                    {errors.uid ? <p className="text-xs text-red-500">{errors.uid}</p> : null}
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="level" className="block text-sm font-medium text-slate-700">
                      BGMI Level
                    </label>
                    <input
                      id="level"
                      type="number"
                      min={1}
                      max={100}
                      value={formData.level}
                      onChange={(event) => handleChange('level', event.target.value)}
                      placeholder="1 - 100"
                      className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition ${errors.level ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'}`}
                    />
                    {errors.level ? <p className="text-xs text-red-500">{errors.level}</p> : null}
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full justify-center" disabled={!isFormValid || isSubmitting}>
                {isSubmitting ? 'Processing payment...' : 'Pay Now'}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MatchRegistrationPage;
