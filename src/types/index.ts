export interface User {
  id: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  token?: string;
}

export interface RegisterFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginFormData {
  mobileNumber: string;
  password: string;
}

export interface RegistrationFormData {
  ign?: string;
  uid: string;
  level: string;
}

export interface Match {
  id: string;
  title: string;
  description: string;
  date: string;
  slot: string;
  prizePool: string;
  entryFee: number;
}

export interface BackendRegistration {
  id: string;
  userId: string;
  name: string;
  email: string;
  mobileNumber: string;
  ign?: string;
  uid: string;
  level: string;
  matchModeId: string;
  mode: string;
  map: string;
  entryFee: number;
  paymentId?: string;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  matchStatus: 'WAITING_FOR_SLOT' | 'SLOT_ASSIGNED' | 'COMPLETED';
  registeredAt: string;
}

export interface Registration {
  id: string;
  userId: string;
  matchId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  registeredAt: string;
}

export interface Payment {
  id: string;
  registrationId: string;
  amount: number;
  method: 'upi' | 'card' | 'wallet';
  status: 'pending' | 'completed' | 'failed';
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin';
}
