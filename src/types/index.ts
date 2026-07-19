export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  phone?: string;
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
