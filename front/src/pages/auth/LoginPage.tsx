import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card, Row, Col, Typography, Divider } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ILogin } from './interfaces';
import { ValidationError } from '../../components/validation/ValidationError';
import { useHttp } from '../../hooks/http/http.hook';
import { message } from 'antd';
import { AuthContextType } from '../../context/types';
import { AuthContext } from '../../context/AuthContext';
import { keys } from '../../config/default';


export const LoginPage:React.FC = () => {

  const auth = useContext<AuthContextType>(AuthContext)
  const { loading, error, request, clearError} = useHttp()

  const [validEmail, setValidEmail] = useState<boolean | null>(true)
  const [validPassword, setValidPassword] = useState<boolean>(true)
  const [formData, setFormData] = useState<ILogin>({
    email: '',
    password: '',
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
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault() 

    setValidEmail(true)
    setFormData({ ...formData, email: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    setValidPassword(e.target.value.length >= 6)
    setFormData({ ...formData, password: e.target.value })
  }

  const handlePasswordBlur = () => {
    setValidPassword(formData.password.length >= 6 || formData.password === '')
  }

  const handleSubmit = async() => { 
    if (!isEmailValid(formData.email)) {
      setValidEmail(false)
      return
    }
    if (formData.password.length < 6) {
      setValidPassword(false)
      return
    }

    try {

      const data = await request(keys.url + '/api/auth/login', 'POST', {...formData})

      auth.login(data.token, data.userId)

      message.open({
        type: 'success',
        content: 'Successfull login'
      })
      
    } catch (e) {
      
    }
  }

  return (
    <Row >
    <Col xs={24} md={{span: 12, offset:6}}>
      <Typography.Title className='text-center' level={2}>
        Authorization
      </Typography.Title>
      <Divider />
      <Card title='Sign In'>
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
          type="password"
          name='password'
          placeholder="Password"
          className={`mt-1 ${!validPassword ? 'input-error' : ' '}`}
          value={formData.password}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
        />
        <ValidationError condition={!validPassword} text='Password must be at least 6 characters long.'/>
        <Button 
          type="primary" 
          htmlType="submit" 
          onClick={handleSubmit} 
          className='mt-1 w-100'
          disabled={loading}
        >
          Sign In 
        </Button>
        <Button
          type="text"
          onClick={() => navigate('/register')}
          className='mt-1 w-100'
          disabled={loading}
        >
          Switch to Sign Up
        </Button>
      </Card>
    </Col>
  </Row>
  )
  
}