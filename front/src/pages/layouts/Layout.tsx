import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import { ILayout } from './interfaces';
import { LogoutOutlined } from '@ant-design/icons';
import { AuthContext } from '../../context/AuthContext';


const { Header, Content, Footer } = Layout;

export const _Layout: React.FC<ILayout> = ({element}) => {
  const navigate = useNavigate()
  const auth = useContext(AuthContext)

  const logoutHandler = (event: React.MouseEvent) => {
    event.preventDefault()
    auth.logout()
    navigate('/')
  }

  return (
    <Layout>
      <Header className='al-i-center'>
        <div className='al-i-center'>
          <Typography.Title 
            level={1} 
            className='text-white' 
            style={{ margin: 0 }}
            onClick={e => navigate('/main')}
          >
            Logs App
          </Typography.Title>
        </div>

        <Menu 
          theme="dark" 
          mode="horizontal" 
          defaultSelectedKeys={['1']} 
          style={{ display: 'flex' }}
          className='ml-auto'
        >
          <Menu.Item key="1">
            <Link to="/main">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/main">About</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="" onClick={logoutHandler}>
              Sign Out <LogoutOutlined />
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className='px-3'>
        {element}
      </Content>
      <Footer className='text-center'>© Simieon Holubiatnykov</Footer>
    </Layout>
  );
};