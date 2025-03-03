export type Profile = {
  id: string;
  email: string;
  username: string;
  phone: string | null;
  address_line_1: string;
  address_line_2: string | null;
  address_line_3: string | null;
  state: string;
  pin: string;
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
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  address_line_3?: string;
  state: string;
  pin: string;
};

export type FetchProfilePayload = {
  user_id: string;
};

export type UpdateProfilePayload = {
  username: string;
  email?: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string;
  address_line_3?: string;
  state: string;
  pin: string;
};
