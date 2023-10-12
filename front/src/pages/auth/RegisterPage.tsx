import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card, Row, Col, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import { IRegister, IRegistrationFormData } from './interfaces';
import { ValidationError } from '../../components/validation/ValidationError';
import { message } from 'antd';
import { useHttp } from '../../hooks/http/http.hook';
import { keys } from '../../config/default';

export const RegisterPage:React.FC = () =>{
  const { loading, error, request, clearError} = useHttp()

  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true)
  const [validEmail, setValidEmail] = useState<boolean>(true)
  const [validPassword, setValidPassword] = useState<boolean>(true)
  const [formData, setFormData] = useState<IRegistrationFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const navigate = useNavigate()


  useEffect(() => {
    if (error) {
      message.open({
          type: 'error',
          content: error
      });
      clearError()
    }
  }, [clearError,error])

  const isEmailValid = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  const handleEmailBlur = () => {
    if (formData.email === '') {
      setValidEmail(true)
    } else {
      setValidEmail(isEmailValid(formData.email))
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault() 

    const value = e.target.value
    setValidEmail(true)
    setFormData({ ...formData, email: value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const value = e.target.value
    setValidPassword(e.target.value.length >= 6)
    setFormData({ ...formData, password: value })
    setPasswordsMatch(formData.confirmPassword === value)
  }

  const handlePasswordBlur = () => {
    setValidPassword(formData.password.length >= 6 || formData.password === '')
  }
  
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const value = e.target.value
    setFormData({ ...formData, confirmPassword: value })
    setPasswordsMatch(value === formData.password)
  }

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false)
      return
    }
    if (!isEmailValid(formData.email)) {
      setValidEmail(false)
      return
    }
    if (formData.password.length < 6) {
      setValidPassword(false)
      return
    }

    try {
      const registerData: IRegister = { ...formData }

      await request(keys.url + '/api/auth/register', 'POST', { ...registerData })

      message.open({
        type: 'success',
        content: 'Successful register'
      })
      
    } catch (e) {
      
    }
  }


  return (
    <Row>
      <Col xs={24} md={{span: 12, offset:6}}>
        <Typography.Title className='text-center' level={2}>
          Registration
        </Typography.Title>
        <Divider />
        <Card title='Sign Up'>
        <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            name='name'
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type="email"
            name='email'
            className={`mt-1 ${!validEmail ? 'input-error' : ''}`}
            value={formData.email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          <ValidationError condition={!validEmail} text='Invalid email format.'/>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            name='password'
            className={`mt-1 ${!validPassword || 
              (!passwordsMatch && formData.confirmPassword.length > 0) ? 'input-error' : ' '}`}
            value={formData.password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          <ValidationError condition={!validPassword} text='Password must be at least 6 characters long.'/>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
            name='confirmPassword'
            className={`mt-1 ${!passwordsMatch && 
              formData.confirmPassword.length > 0 ? 'input-error' : ''}`}
            value={formData.confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            className='mt-1 w-100'
            disabled={loading}
          >
            Sign Up
          </Button>
          <Button
            type="text"
            onClick={() => navigate('/login')}
            className='mt-1 w-100'
            disabled={loading}
          >
            Switch to Sign In
          </Button>
        </Card>
      </Col>
    </Row>
    
  )
}