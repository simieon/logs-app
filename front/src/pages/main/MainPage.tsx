import { Typography } from "antd";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { _Layout as Layout } from "../layouts/Layout";
import { LogsForm } from "../../components/logs/LogsForm";
import { LogsList } from "../../components/logs/LogsList";
import { ILog } from "../../components/logs/interfaces";
import { useHttp } from "../../hooks/http/http.hook";
import { Spin } from "antd";
import { AuthContext } from "../../context/AuthContext";
import { keys } from "../../config/default";

export const MainPage: React.FC = () => {
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
      } catch (error) {
          
      }
  }, [auth.token, request])

  useEffect(() => {
      fetchLogs()
  }, [fetchLogs])


  const addHandler =  async(content:string) => {
    try {
      
      const data = await request(keys.url + '/api/logs', 'POST',{content}, {
        Authorization: `Bearer ${auth.token}`
      })
      const newLog: ILog = {
        id: data.logId,
        content
      }
      console.log(data)

      setLogs([newLog, ...logs])
      console.log(logs)
    } catch (e) {
        
    }
  }

  const removeHandler = async(id:number) => {
    try {
      const data = await request(keys.url + `/api/logs/${id}`, 'DELETE', null, {
          Authorization: `Bearer ${auth.token}`
      })
      console.log(data)
      setLogs(prevLogs => prevLogs.filter(log => log.id !== id))
      
    } catch (e) {
        
    }
  }

  return (
    <Layout element= {
      <div className="container">
        {
          loading && <Spin className="m-auto"/> 
        }
          <>
            <Typography.Title className="text-center" level={1}>
              Main Page
            </Typography.Title>
    
            <LogsForm onAdd={addHandler}/>
            <LogsList 
              logs={logs!}
              onRemove={removeHandler}
            />
          </>
        
      </div>
    } />
  )
}