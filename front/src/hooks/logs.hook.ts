import { useCallback, useContext, useEffect, useState } from "react"
import { ILog } from "../components/logs/interfaces"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "./http.hook"
import { keys } from "../config/default"

export const useLogs = () => {
  const [logs, setLogs] = useState<ILog[]>([])
  const auth = useContext(AuthContext)
  const { loading, request } = useHttp()

  const fetchLogs = useCallback( async() => {
      try {
          const fetched = await request(keys.url + '/api/logs', 'GET', null, {
              Authorization: 'Bearer ' + auth.token
          })
          fetched.reverse()
          setLogs(fetched)
      } catch (e) {
        throw e
      }
  }, [auth.token, request])

  useEffect(() => {
      fetchLogs()
  }, [fetchLogs])

  const addLog =  async(newLog:ILog) => {
    try {

      if(newLog.content.trim().length > 0) {

        const data = await request(keys.url + '/api/logs', 'POST',{content: newLog.content}, {
          Authorization: `Bearer ${auth.token}`
        })

        newLog.id = data.logId

        setLogs([newLog, ...logs])
        console.log(logs)
      }
    } catch (e) {
      throw e
    }
  }

  const removeLog = async(id: number) => {
    try {
      await request(keys.url + `/api/logs/${id}`, 'DELETE', null, {
        Authorization: `Bearer ${auth.token}`
      })
      setLogs(prevLogs => prevLogs.filter(log => log.id !== id))
    } catch (e) {
      throw e
    }
    
  }

  return { logs, loading, addLog, removeLog }
}