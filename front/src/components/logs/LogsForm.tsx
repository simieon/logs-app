import React, {useState} from "react";
import { Input } from 'antd';

interface ILogsFormProps{
  onAdd:(content: string) => void
}

const { Search } = Input;

export const LogsForm: React.FC<ILogsFormProps> = (props) => {
  const [content, setContent] = useState<string>('')
  
  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value)
  }

  const onSearchHandler = () => {
    props.onAdd(content)
    setContent('')
  }

  const keyUpHandler = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter') {
      onSearchHandler()
    }
  }

  return (
    <>
      <Search
        id="content"
        placeholder="Enter the log content"
        onSearch={value => onSearchHandler()} 
        value={content}
        enterButton="Enter" 
        onKeyUp={keyUpHandler}
        onChange={changeHandler}
      />
    </>
  );
}