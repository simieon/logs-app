import { useState, useCallback, useEffect } from "react";
import { IAuthData } from "./interfaces";
import { keys } from "../../config/default";

const storageName:string = keys.storageName


export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [ready, setReady] = useState<boolean>(false)

  const login = useCallback((jwtToken: string, id: string) => {
    setToken(jwtToken)
    setUserId(id)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id,
      token: jwtToken,
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)

    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const storedData = localStorage.getItem(storageName)
    if (storedData) {
      const data = JSON.parse(storedData) as IAuthData
      if (data.token && data.userId) {
        login(data.token, data.userId)
      }
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready }
}