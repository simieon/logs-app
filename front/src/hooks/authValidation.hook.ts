import { useState } from "react";
import { ILoginFormData, IRegistrationFormData } from "../pages/auth/interfaces";


export const useAuthValidation = () => {
  const [validName, setValidName] = useState<boolean>(true)
  const [passwordsMatch, setPasswordMatch] = useState<boolean>(true)
  const [validEmail, setValidEmail] = useState<boolean>(true)
  const [validPassword, setValidPassword] = useState<boolean>(true)

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  const validateForm = async(formData: IRegistrationFormData | ILoginFormData) => {
    const {email, password} = formData

    const isValidEmail = validateEmail(email)
    const isValidPassword = password.length >= 8

    setValidEmail(isValidEmail)
    setValidPassword(isValidPassword)

    if ('name' in formData && 'confirmPassword' in formData) {
      const {name, confirmPassword} = formData

      const isValidName = name.trim().length !== 0
      const isPasswordsMatch = confirmPassword === password

      setValidName(isValidName)
      setPasswordMatch(isPasswordsMatch)

      return {isValidName, isValidEmail, isValidPassword, isPasswordsMatch}
    }

    return {isValidEmail, isValidPassword}
  }

  return {
    validName,
    validEmail,
    validPassword,
    passwordsMatch,
    validateForm
  }
}