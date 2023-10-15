import { Typography } from "antd";
import React from "react";
import { _Layout as Layout } from "../layouts/Layout";
import { LogsForm } from "../../components/logs/LogsForm";
import { LogsList } from "../../components/logs/LogsList";
import { ILog } from "../../components/logs/interfaces";
import { Spin } from "antd";
import { useLogs } from "../../hooks/logs.hook";
import { message } from "antd";

export const MainPage: React.FC = () => {
  const { loading, logs, addLog, removeLog } = useLogs()


  const addHandler =  async(content:string) => {
    try {
      const newLog: ILog = {
        content
      }
      await addLog(newLog)
    } catch (e) {
      message.open({
        type: 'error',
        content: 'error adding a log'
      })
    }
  }

  const removeHandler = async(id:number) => {
    try {
      await removeLog(id)
    } catch (e) {
      message.open({
        type: 'error',
        content: 'error removing a log'
      })
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