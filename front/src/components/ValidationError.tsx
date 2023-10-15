
interface IValidationError{
  condition: boolean,
  text:string
}

export const ValidationError:React.FC<IValidationError> = (props) => {
  return (
    <>
      {props.condition  && (
          <div className='input-error-message'>
            {props.text}
          </div>
        )
      } 
    </>
  )
}