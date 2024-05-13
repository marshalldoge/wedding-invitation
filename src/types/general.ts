export interface Guest {
  id: string;
  name?: string;
  table?: string;
  gender?: string;
  confirmation?: InvitationConfirmation;
  locked?: boolean;
}

export type InvitationConfirmation = 'PENDING' | 'Y' | 'N';
