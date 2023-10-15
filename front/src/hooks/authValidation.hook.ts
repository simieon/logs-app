import { useState } from "react";
import { ILogin, IRegistrationFormData } from "../pages/auth/interfaces";


export const useAuthValidation = () => {
  const [validName, setValidName] = useState<boolean>(true)
  const [passwordsMatch, setPasswordMatch] = useState<boolean>(true)
  const [validEmail, setValidEmail] = useState<boolean>(true)
  const [validPassword, setValidPassword] = useState<boolean>(true)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  const validatePassword = (password:string): boolean => password.length >= 6

  const validateFormRegister = async(formData:IRegistrationFormData) => {
    const { name, email, password, confirmPassword } = formData
    setValidName(name.trim().length !== 0)
    setValidEmail(validateEmail(email))
    setValidPassword(validatePassword(password))
    setPasswordMatch(confirmPassword === password)

    const isValidName = name.trim().length !== 0
    const isValidEmail = validateEmail(email)
    const isValidPassword = validatePassword(password)
    const isPasswordsMatch = confirmPassword === password
    
    return { isValidName, isValidEmail, isPasswordsMatch, isValidPassword }
  }

  const validateFormLogin = async(formData:ILogin) => {
    const { email, password } = formData
    setValidEmail(validateEmail(email))
    setValidPassword(validatePassword(password))

    const isValidEmail = validateEmail(email)
    const isValidPassword = validatePassword(password)
    
    return { isValidEmail, isValidPassword }
  }

  return { validName, passwordsMatch, validEmail, validPassword, validateFormRegister, validateFormLogin }
};