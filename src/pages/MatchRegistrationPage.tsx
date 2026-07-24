import { type FormEvent, type ReactElement, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import InfoRow from '../components/InfoRow';
import Button from '../components/Button';
import type { MatchMode } from '../types/matchMode';
import type { RegistrationFormData, User } from '../types';
import { matchModes } from '../data/matchModes';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../config/api';

const initialFormData: RegistrationFormData = {
  ign: '',
  uid: '',
  level: '',
};

const MatchRegistrationPage = (): ReactElement => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [currentUser, setCurrentUser] = useState<User | null>(user);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({});
  const [apiError, setApiError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const selectedMode = useMemo<MatchMode | undefined>(() => {
    return matchModes.find((mode) => mode.id === matchId);
  }, [matchId]);

  // Fetch logged-in user details from backend
  useEffect(() => {
    if (!user) return;

    const fetchUserProfile = async () => {
      setLoadingUser(true);
      try {
        if (user.token) {
          const response = await fetch(`${API_BASE_URL}/api/user/me`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setCurrentUser((prev) => ({
              ...prev,
              id: data.id || prev?.id || '',
              fullName: data.fullName || prev?.fullName || '',
              email: data.email || prev?.email || '',
              mobileNumber: data.mobileNumber || prev?.mobileNumber || '',
              token: user.token,
            }));
          }
        }
      } catch (err) {
        console.warn('Backend user endpoint unreachable, using local auth user', err);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  // Form Validation Rules: IGN Optional, UID Mandatory, Level Mandatory
  const validationErrors = useMemo(() => {
    const nextErrors: Partial<Record<keyof RegistrationFormData, string>> = {};
    const uidValue = formData.uid?.trim() ?? '';
    const levelValue = String(formData.level ?? '').trim();

    if (!uidValue) {
      nextErrors.uid = 'BGMI UID is mandatory.';
    } else if (!/^\d+$/.test(uidValue)) {
      nextErrors.uid = 'BGMI UID must contain numbers only.';
    }

    if (!levelValue) {
      nextErrors.level = 'BGMI Level is mandatory.';
    } else {
      const levelNum = Number(levelValue);
      if (!Number.isFinite(levelNum) || levelNum < 1 || levelNum > 100) {
        nextErrors.level = 'Enter a valid BGMI level between 1 and 100.';
      }
    }

    return nextErrors;
  }, [formData]);

  const isFormValid = selectedMode !== undefined && Object.keys(validationErrors).length === 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setErrors(validationErrors);
    setApiError(null);

    if (!isFormValid || !selectedMode) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (user?.token) {
        const response = await fetch(`${API_BASE_URL}/api/registrations`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            matchModeId: selectedMode.id,
            mode: selectedMode.modeName,
            map: selectedMode.map,
            entryFee: selectedMode.entryFee,
            ign: formData.ign?.trim() || '',
            uid: formData.uid.trim(),
            level: String(formData.level).trim(),
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to create tournament registration');
        }

        // Navigate to payment page with registration ID
        navigate(`/payment/${data.id}`, { state: { registration: data, match: selectedMode } });
      } else {
        // Fallback for non-authenticated or demo local flow
        const dummyRegistrationId = 'REG_' + Math.random().toString(36).substring(2, 9).toUpperCase();
        const demoRegistration = {
          id: dummyRegistrationId,
          userId: currentUser?.id || 'guest',
          name: currentUser?.fullName || 'Guest Player',
          email: currentUser?.email || 'guest@example.com',
          mobileNumber: currentUser?.mobileNumber || '9876543210',
          ign: formData.ign?.trim() || '',
          uid: formData.uid.trim(),
          level: String(formData.level).trim(),
          matchModeId: selectedMode.id,
          mode: selectedMode.modeName,
          map: selectedMode.map,
          entryFee: selectedMode.entryFee,
          paymentStatus: 'PENDING',
        };
        navigate(`/payment/${dummyRegistrationId}`, { state: { registration: demoRegistration, match: selectedMode } });
      }
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof RegistrationFormData, value: string): void => {
    setFormData((current: RegistrationFormData) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({ ...current, [field]: undefined }));
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
        <Card title={`${selectedMode.modeName} Registration`} description="Review pre-filled details and complete registration fields before payment.">
          <div className="space-y-8">

            {apiError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {apiError}
              </div>
            )}

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-semibold text-slate-900">Your Account Details (Pre-filled)</h2>
              {loadingUser ? (
                <p className="mt-2 text-sm text-slate-500">Loading user profile...</p>
              ) : (
                <div className="mt-4 space-y-3">
                  <InfoRow label="Full Name" value={currentUser?.fullName || 'Aarav Sharma'} />
                  <InfoRow label="Email" value={currentUser?.email || 'aarav.sharma@example.com'} />
                  <InfoRow label="Mobile Number" value={currentUser?.mobileNumber || '9876543210'} />
                </div>
              )}
            </section>

            <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="text-base font-semibold text-slate-900">Tournament Info</h2>
              <div className="mt-4 space-y-3">
                <InfoRow label="Mode" value={selectedMode.modeName} />
                <InfoRow label="Map" value={selectedMode.map} />
                <InfoRow label="Entry Fee" value={`₹${selectedMode.entryFee}`} />
              </div>
            </section>

            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="text-base font-semibold text-slate-900">In-Game Details</h2>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">

                  {/* BGMI In-Game Name - OPTIONAL */}
                  <div className="space-y-2">
                    <label htmlFor="ign" className="block text-sm font-medium text-slate-700">
                      BGMI In-Game Name (IGN) <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      id="ign"
                      type="text"
                      value={formData.ign}
                      onChange={(event) => handleChange('ign', event.target.value)}
                      placeholder="e.g. Mortal_007"
                      className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition ${errors.ign ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'}`}
                    />
                    {errors.ign ? <p className="text-xs text-red-500">{errors.ign}</p> : null}
                  </div>

                  {/* BGMI UID - MANDATORY */}
                  <div className="space-y-2">
                    <label htmlFor="uid" className="block text-sm font-medium text-slate-700">
                      BGMI UID <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="uid"
                      type="text"
                      inputMode="numeric"
                      value={formData.uid}
                      onChange={(event) => handleChange('uid', event.target.value)}
                      placeholder="e.g. 5123456789"
                      className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition ${errors.uid ? 'border-red-400 focus:ring-2 focus:ring-red-400' : 'border-slate-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'}`}
                    />
                    {errors.uid ? <p className="text-xs text-red-500">{errors.uid}</p> : null}
                  </div>

                  {/* BGMI Level - MANDATORY */}
                  <div className="space-y-2 sm:col-span-2">
                    <label htmlFor="level" className="block text-sm font-medium text-slate-700">
                      BGMI Level <span className="text-red-500">*</span>
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
                {isSubmitting ? 'Creating Registration...' : 'Pay Now'}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MatchRegistrationPage;
