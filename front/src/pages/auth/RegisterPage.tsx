import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Input, Card, Row, Col, Typography, Divider } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import { IRegister, IRegistrationFormData } from './interfaces';
import { ValidationError } from '../../components/ValidationError';
import { message } from 'antd';
import { useHttp } from '../../hooks/http.hook';
import { keys } from '../../config/default';
import { useAuthValidation } from '../../hooks/authValidation.hook';

export const RegisterPage:React.FC = () =>{
  const { loading, error, request, clearError} = useHttp()

  const { validName, validEmail, validPassword, passwordsMatch, validateForm } = useAuthValidation()
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

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async () => {
    const { isValidEmail, isPasswordsMatch, isValidName, isValidPassword } = await validateForm(formData)

    if (!isValidPassword || !isPasswordsMatch || !isValidEmail || !isValidName) {
      return
    }

    try {

      const registerData: IRegister = { ...formData }

      await request(keys.url + '/api/auth/register', 'POST', { ...registerData })

      message.open({
        type: 'success',
        content: 'Successful registration'
      })
    } catch (e) {
      console.log(e)
    }
    setFormData({name: '', password: '', email: '', confirmPassword: ''} as IRegistrationFormData)
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
            className={`${!validName ? 'input-error' : ''}`}
            value={formData.name}
            onChange={changeHandler}
          />
          <ValidationError condition={!validName} text='Username should not be empty.'/>
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
            placeholder="Password"
            name='password'
            className={`mt-1 ${!validPassword || 
              (!passwordsMatch && formData.confirmPassword.length > 0) ? 'input-error' : ' '}`}
            value={formData.password}
            onChange={changeHandler}
          />
          <ValidationError condition={!validPassword} text='Password must be at least 6 characters long.'/>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
            name='confirmPassword'
            className={`mt-1 ${!passwordsMatch && 
              formData.confirmPassword.length > 0 ? 'input-error' : ''}`}
            value={formData.confirmPassword}
            onChange={changeHandler}
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