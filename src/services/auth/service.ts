import { createFetcher, ROUTES } from "@/services/api";
import { FetchProfilePayload, Profile, SignupPayload } from "./types";

const getAllOrders = createFetcher<
  Profile[] | null,
  unknown,
  unknown
  // {
  //   page: number;
  // }
>({
  url: ROUTES.AUTH.USERS.GETALL,
  method: "GET",
  withTokenKey: "profile_token",
});

const signup = createFetcher<
  Profile[] | null,
  SignupPayload,
  {
    page: number;
  }
>({
  url: ROUTES.AUTH.SIGNUP,
  method: "POST",
});

const login = createFetcher<
  Profile[] | null,
  unknown,
  {
    page: number;
  }
>({
  url: ROUTES.AUTH.LOGIN,
  method: "POST",
});

const fetchProfile = createFetcher<Profile, FetchProfilePayload>({
  url: ROUTES.AUTH.FETCHPROFILE,
  method: "POST",
});

export const authService = {
  getAllOrders,
  signup,
  login,
  fetchProfile,
};
