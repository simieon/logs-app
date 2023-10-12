import { createContext } from "react";
import { AuthContextType } from "./types";

const noop = () => {};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  login: noop,
  logout: noop,
  isAuthenticated: false,
});