export interface IRegister{
  name: string, 
  email:string,
  password:string
}

export interface IRegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin{
  email: string,
  password: string
}

export interface ILoginFormData {
  email: string,
  password: string
}