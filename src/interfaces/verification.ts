export interface VerificationRequest {
  id: string;
  userId: string;
  documentType: string;
  documentUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  notes?: string;
}

export interface CreateVerificationRequest {
  userId: string;
  documentType: string;
  documentUrl: string;
  notes?: string;
}

export interface UpdateVerificationRequest {
  documentType?: string;
  documentUrl?: string;
  notes?: string;
}

export interface VerificationState {
  verificationRequests: VerificationRequest[];
  currentRequest: VerificationRequest | null;
  pendingRequests: VerificationRequest[];
  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
