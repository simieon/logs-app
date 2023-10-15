import { createContext } from "react";
import { IAuthContext } from "./interfaces";



export const AuthContext = createContext<IAuthContext>({
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});