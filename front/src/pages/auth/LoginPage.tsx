import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card, Row, Col, Typography, Divider } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { ILogin } from './interfaces';
import { ValidationError } from '../../components/ValidationError';
import { useHttp } from '../../hooks/http.hook';
import { message } from 'antd';
import { AuthContext } from '../../context/AuthContext';
import { keys } from '../../config/default';
import { IAuthContext } from '../../context/interfaces';
import { useAuthValidation } from '../../hooks/authValidation.hook';


export const LoginPage:React.FC = () => {

  const auth = useContext<IAuthContext>(AuthContext)
  const { loading, error, request, clearError} = useHttp()

  const { validEmail, validPassword, validateFormLogin } = useAuthValidation()
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
      })
      clearError()
    }
  }, [clearError,error])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async() => { 
    const { isValidEmail, isValidPassword } = await validateFormLogin(formData)

    if (!isValidPassword || !isValidEmail) {
      return
    }

    try {

      const data = await request(keys.url + '/api/auth/login', 'POST', {...formData})

      await auth.login(data.token, data.userId)
      
      message.open({
        type: 'success',
        content: 'Successfull login'
      })
      
    } catch (e) {
      console.log('error')
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
          onChange={changeHandler}
        />
        <ValidationError condition={!validEmail} text='Invalid email format.'/>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          name='password'
          placeholder="Password"
          className={`mt-1 ${!validPassword ? 'input-error' : ' '}`}
          value={formData.password}
          onChange={changeHandler}
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