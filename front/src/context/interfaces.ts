export interface IAuthContext {
  token: string | null
  userId: string | null
  login: (token: string, userId: string) => void
  logout: () => void
  isAuthenticated: boolean
}