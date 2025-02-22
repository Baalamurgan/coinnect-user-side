export type Profile = {
  id: string;
  email: string;
  username: string;
  created_at: number;
  updated_at: number;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = {
  username: string;
  email: string;
  password: string;
};

export type FetchProfilePayload = {
  user_id: string;
};

export type UpdateProfilePayload = {
  username: string;
  email?: string;
  phone?: string;
};
