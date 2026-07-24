import { type ReactElement, useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Card from '../components/Card';
import InfoRow from '../components/InfoRow';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { Clock, RefreshCw, CheckCircle2, ShieldAlert, QrCode } from 'lucide-react';

interface PaymentPageLocationState {
  registration?: {
    id: string;
    name?: string;
    email?: string;
    mobileNumber?: string;
    ign?: string;
    uid?: string;
    level?: string;
    mode?: string;
    map?: string;
    entryFee?: number;
  };
  match?: {
    modeName?: string;
    map?: string;
    entryFee?: number;
  };
}

const PaymentPage = (): ReactElement => {
  const { registrationId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const stateData = (location.state as PaymentPageLocationState) || {};
  const [registration, setRegistration] = useState(stateData.registration);

  const [timeLeft, setTimeLeft] = useState<number>(60); // 1 minute countdown (60 seconds)
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [qrSeed, setQrSeed] = useState<number>(Date.now());

  // Fetch registration details from backend if state was not passed directly
  useEffect(() => {
    if (!registration && registrationId) {
      const fetchRegistration = async () => {
        try {
          const res = await fetch(`http://localhost:8080/api/registrations/${registrationId}`);
          if (res.ok) {
            const data = await res.json();
            setRegistration(data);
          }
        } catch (err) {
          console.warn('Unable to load registration from backend', err);
        }
      };
      fetchRegistration();
    }
  }, [registrationId, registration]);

  // 1-minute countdown timer logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Restart session handler
  const handleRestartSession = (): void => {
    setTimeLeft(60);
    setIsExpired(false);
    setErrorMsg(null);
    setQrSeed(Date.now());
  };

  // Payment Submit handler
  const handleConfirmPayment = async (): Promise<void> => {
    if (isExpired) return;

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      if (user?.token && registrationId) {
        const response = await fetch(`http://localhost:8080/api/registrations/${registrationId}/pay`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Payment verification failed on backend server.');
        }
      }

      // Navigate to confirmation page
      navigate('/confirmation', {
        state: {
          message: 'Registration and Payment Completed Successfully!',
          registrationId: registrationId || registration?.id,
        },
      });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to confirm payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate SVG dummy QR Code grid based on qrSeed
  const qrSvgGrid = useMemo(() => {
    const size = 7;
    const modules: boolean[][] = [];
    let seed = qrSeed;

    for (let r = 0; r < size; r++) {
      modules[r] = [];
      for (let c = 0; c < size; c++) {
        // Corners finders pattern simulation
        if (
          (r < 2 && c < 2) ||
          (r < 2 && c >= size - 2) ||
          (r >= size - 2 && c < 2)
        ) {
          modules[r][c] = true;
        } else {
          seed = (seed * 9301 + 49297) % 233280;
          modules[r][c] = seed / 233280 > 0.45;
        }
      }
    }
    return modules;
  }, [qrSeed]);

  const modeName = registration?.mode || stateData.match?.modeName || 'Tournament';
  const entryFee = registration?.entryFee ?? stateData.match?.entryFee ?? 50;

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <Card title="Tournament Payment Gateway" description="Scan QR code using any UPI App to complete your registration.">
          <div className="space-y-6">

            {/* Session Timer Alert Banner */}
            <div
              className={`flex items-center justify-between rounded-2xl border p-4 transition ${
                isExpired
                  ? 'border-red-300 bg-red-50 text-red-700'
                  : timeLeft <= 15
                  ? 'border-amber-300 bg-amber-50 text-amber-800'
                  : 'border-orange-200 bg-orange-50 text-orange-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                {isExpired ? (
                  <ShieldAlert className="h-6 w-6 text-red-600" />
                ) : (
                  <Clock className="h-6 w-6 text-orange-600 animate-pulse" />
                )}
                <div>
                  <p className="text-sm font-semibold">
                    {isExpired ? 'Session Expired' : 'Payment Session Active'}
                  </p>
                  <p className="text-xs opacity-80">
                    {isExpired
                      ? 'The 1-minute QR session has timed out. Please generate a new session.'
                      : 'Scan and complete payment before the countdown ends.'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span
                  className={`font-mono text-2xl font-bold ${
                    isExpired
                      ? 'text-red-600'
                      : timeLeft <= 15
                      ? 'text-amber-600'
                      : 'text-orange-600'
                  }`}
                >
                  {isExpired ? '00:00' : formatTime(timeLeft)}
                </span>
              </div>
            </div>

            {errorMsg && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {errorMsg}
              </div>
            )}

            {/* QR Code Section */}
            <div className="relative flex flex-col items-center justify-center rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center space-x-2 text-slate-700 font-semibold text-sm">
                <QrCode className="h-5 w-5 text-orange-500" />
                <span>UPI Payment QR Code</span>
              </div>

              <div className="relative overflow-hidden rounded-2xl border-4 border-slate-900 bg-white p-4 shadow-inner">
                {/* SVG Dummy QR Code */}
                <svg
                  className={`h-48 w-48 transition duration-300 ${isExpired ? 'blur-sm opacity-25' : 'opacity-100'}`}
                  viewBox="0 0 7 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {qrSvgGrid.map((row, r) =>
                    row.map((cell, c) => (
                      <rect
                        key={`${r}-${c}`}
                        x={c}
                        y={r}
                        width="0.92"
                        height="0.92"
                        rx="0.1"
                        fill={cell ? '#0f172a' : '#ffffff'}
                      />
                    ))
                  )}
                </svg>

                {/* Expired Overlay */}
                {isExpired && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/60 p-2 text-center text-white backdrop-blur-[2px]">
                    <ShieldAlert className="h-10 w-10 text-red-400 mb-1" />
                    <span className="text-sm font-bold tracking-wide text-red-200">SESSION EXPIRED</span>
                    <span className="text-[11px] text-slate-300">QR Code Invalid</span>
                  </div>
                )}
              </div>

              <p className="mt-3 text-xs text-slate-500 font-medium">
                UPI ID: <span className="font-mono text-slate-800">bgmi.arena@upi</span>
              </p>

              {/* Restart Timer Button if Expired */}
              {isExpired && (
                <button
                  type="button"
                  onClick={handleRestartSession}
                  className="mt-4 inline-flex items-center space-x-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-slate-800 transition"
                >
                  <RefreshCw className="h-4 w-4" />
                  <span>Generate New Payment Session</span>
                </button>
              )}
            </div>

            {/* Tournament & Player Summary */}
            <div className="grid gap-4 sm:grid-cols-2">
              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Tournament Details</h3>
                <div className="mt-3 space-y-2">
                  <InfoRow label="Mode" value={modeName} />
                  <InfoRow label="Entry Fee" value={`₹${entryFee}`} />
                  <InfoRow label="Registration ID" value={registrationId || registration?.id || 'N/A'} />
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Player Details</h3>
                <div className="mt-3 space-y-2">
                  <InfoRow label="Player Name" value={registration?.name || 'Player'} />
                  <InfoRow label="Mobile" value={registration?.mobileNumber || 'N/A'} />
                  <InfoRow label="IGN" value={registration?.ign || 'Not Specified'} />
                  <InfoRow label="BGMI UID" value={registration?.uid || 'N/A'} />
                </div>
              </section>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <Button
                type="button"
                onClick={handleConfirmPayment}
                className="w-full justify-center"
                disabled={isExpired || isSubmitting}
              >
                {isSubmitting ? (
                  'Verifying Payment...'
                ) : (
                  <span className="flex items-center space-x-2">
                    <CheckCircle2 className="h-5 w-5" />
                    <span>I Have Paid ₹{entryFee}</span>
                  </span>
                )}
              </Button>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-800 font-medium py-1"
              >
                Cancel and Go Back
              </button>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
