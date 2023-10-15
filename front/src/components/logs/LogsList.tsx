import React from "react";
import { List, Button } from 'antd';
import { DeleteOutlined } from "@ant-design/icons";
import { ILog } from "./interfaces";

interface ILogsListProps {
  logs: ILog[], 
  onRemove: (id:number) => void
}

export const LogsList: React.FC<ILogsListProps> = (props) => {

  const removeHandler = (event: React.MouseEvent, id:number) => {
    event.preventDefault();
    props.onRemove(id)
  }

  return (
    <List
      className="mt-1"
      size="large"
      itemLayout="horizontal"
      bordered
      dataSource={props.logs}
      renderItem={(log) => (
        <List.Item
          key={log.id}
          actions={[
            <Button
              type="link"
              className="material-symbols-outlined red-text"
              onClick={(event) => removeHandler(event, log.id!)}
            >
              <DeleteOutlined style={{fontSize: '20px', color:'red'}}/>
            </Button>
          ]}
        >
          <List.Item.Meta
            title={log.content}
          />
        </List.Item>
      )}
    />
  )
}