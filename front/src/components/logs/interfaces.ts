export interface ILog{
  id:number,
  content: string
}

export interface ILogsFormProps{
  onAdd:(content: string) => void
}

export type ILogsListProps = {
  logs: ILog[], 
  onRemove: (id:number) => void
}