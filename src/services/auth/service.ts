import { createFetcher, ROUTES } from "@/services/api";
import {
  FetchProfilePayload,
  Profile,
  SignupPayload,
  UpdateProfilePayload,
} from "./types";

const signup = createFetcher<Profile | null, SignupPayload, unknown>({
  url: ROUTES.AUTH.SIGNUP,
  method: "POST",
});

const login = createFetcher<Profile | null, unknown, unknown>({
  url: ROUTES.AUTH.LOGIN,
  method: "POST",
});

const fetchProfile = createFetcher<Profile, FetchProfilePayload>({
  url: ROUTES.AUTH.PROFILE.FETCH,
  method: "POST",
});

const updateProfile = createFetcher<
  string,
  UpdateProfilePayload,
  {
    user_id: string;
  }
>({
  url: ({ user_id }) => ROUTES.AUTH.PROFILE.UPDATE({ user_id }),
  method: "PUT",
});

export const authService = {
  signup,
  login,
  fetchProfile,
  updateProfile,
};
